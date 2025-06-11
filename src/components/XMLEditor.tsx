
import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface XMLEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (xml: string) => void;
}

interface ValidationError {
  line: number;
  column: number;
  message: string;
}

interface AutoCompleteItem {
  label: string;
  insertText: string;
  kind: 'element' | 'attribute' | 'value';
}

const XMLEditor: React.FC<XMLEditorProps> = ({ isOpen, onClose, onSubmit }) => {
  const [xmlContent, setXmlContent] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<AutoCompleteItem[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Schema elements for auto-completion
  const schemaElements = {
    root: ['HILTaskTemplate'],
    HILTaskTemplate: [
      'Name', 'Description', 'LoopProjectId', 'LoopProjectName', 'LoopProjectEnvId',
      'LoopModuleComponentId', 'LoopModuleId', 'LoopWorkspaceId', 'LoopWorkspaceName',
      'Service', 'ServiceType', 'AIPipeline', 'Datahub', 'RequiredInput', 'RequiredOutput',
      'FeedbackFormat', 'UsecaseId', 'TemplateId', 'PluginDetails', 'TaskReferences', 'HILTeamStructure'
    ],
    AIPipeline: [
      'NodeName', 'LoopPipelineName', 'PipelineId', 'PipelineVersion', 'ExecutionId',
      'PipelineType', 'ScanSequence'
    ],
    Datahub: [
      'DatahubInputDataType', 'DatahubInputCoordinates', 'DatahubInputObjectName',
      'DatahubOutputCoordinates', 'DatahubOutputObjectName', 'DatasetType', 'DataCatalogueId'
    ],
    PluginDetails: [
      'Proxy', 'TaskWorkbenchPlatformPlugin', 'TaskTAWorkbenchPlatformPlugin', 'CallbackHandler'
    ],
    TaskReferences: [
      'UnderstandingInputReferences', 'UnderstandingTodoTaskGuidelines',
      'UnderstandingOutputTobeProducedGuidelines', 'UnderstandingHowToProvideFeedbackToImproveAutomationGuidelines',
      'ArtifactType', 'ArtifactFileNames', 'ArtifactInputCoordinates', 'ArtifactOutputCoordinates',
      'ArtifactOutputFilename', 'GuidanceDocument'
    ],
    HILTeamStructure: ['MakerPersonas', 'CheckerPersonas'],
    MakerPersonas: ['MakerCheckerRatio', 'EffortFormulaRatio', 'ETA', 'Persona'],
    CheckerPersonas: ['Workflow', 'AllowedActivities', 'PersonaJD', 'overallExp', 'Skills', 'HourlyCostRange', 'Qualification'],
    Persona: ['WorkbenchDetails', 'PersonaJD'],
    WorkbenchDetails: [
      'NumberOfWorkbench', 'ExclusiveOrSharable', 'WorkbenchAvailability', 'Timezone',
      'StartTime', 'EndTime', 'AllowedActivities', 'ExclusiveOfSharable'
    ],
    PersonaJD: ['OverallExp', 'Skills', 'HourlyCostRange', 'Qualification']
  };

  useEffect(() => {
    // Load draft from localStorage on mount
    const draft = localStorage.getItem('xml-editor-draft');
    if (draft && xmlContent === '') {
      setXmlContent(draft);
    }
  }, []);

  useEffect(() => {
    // Save draft to localStorage
    if (xmlContent) {
      localStorage.setItem('xml-editor-draft', xmlContent);
    }
  }, [xmlContent]);

  const validateXML = (xml: string): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    if (!xml.trim()) {
      return errors;
    }

    try {
      // Basic XML well-formedness check
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'application/xml');
      const parseError = doc.querySelector('parsererror');
      
      if (parseError) {
        errors.push({
          line: 1,
          column: 1,
          message: 'XML is not well-formed'
        });
      } else {
        // Basic schema validation - check root element
        const rootElement = doc.documentElement;
        if (rootElement.tagName !== 'HILTaskTemplate') {
          errors.push({
            line: 1,
            column: 1,
            message: 'Root element must be HILTaskTemplate'
          });
        }
      }
    } catch (error) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Invalid XML syntax'
      });
    }

    return errors;
  };

  const getAutoCompleteSuggestions = (text: string, position: number): AutoCompleteItem[] => {
    const beforeCursor = text.substring(0, position);
    const lines = beforeCursor.split('\n');
    const currentLine = lines[lines.length - 1];
    
    // Find current context (parent element)
    const openTags: string[] = [];
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)/g;
    let match;
    
    while ((match = tagRegex.exec(beforeCursor)) !== null) {
      const tagName = match[1];
      if (match[0].startsWith('</')) {
        // Closing tag
        if (openTags[openTags.length - 1] === tagName) {
          openTags.pop();
        }
      } else {
        // Opening tag
        openTags.push(tagName);
      }
    }

    const currentContext = openTags.length > 0 ? openTags[openTags.length - 1] : 'root';
    
    // Check if typing an opening tag
    if (currentLine.includes('<') && !currentLine.includes('>')) {
      const elementName = currentLine.substring(currentLine.lastIndexOf('<') + 1);
      const availableElements = schemaElements[currentContext as keyof typeof schemaElements] || [];
      
      return availableElements
        .filter(el => el.toLowerCase().includes(elementName.toLowerCase()))
        .map(el => ({
          label: el,
          insertText: el,
          kind: 'element' as const
        }));
    }

    return [];
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setXmlContent(newContent);
    
    // Validate XML
    const errors = validateXML(newContent);
    setValidationErrors(errors);
    setIsValid(errors.length === 0 && newContent.trim() !== '');
    
    // Update cursor position
    const textarea = e.target;
    const { selectionStart } = textarea;
    const textBeforeCursor = newContent.substring(0, selectionStart);
    const lines = textBeforeCursor.split('\n');
    setCursorPosition({ line: lines.length, column: lines[lines.length - 1].length + 1 });
    
    // Show auto-complete suggestions
    const suggestions = getAutoCompleteSuggestions(newContent, selectionStart);
    setSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
    
    if (e.ctrlKey && e.key === ' ') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const suggestions = getAutoCompleteSuggestions(xmlContent, textarea.selectionStart);
        setSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
      }
    }
  };

  const insertSuggestion = (suggestion: AutoCompleteItem) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const { selectionStart, selectionEnd } = textarea;
    const beforeCursor = xmlContent.substring(0, selectionStart);
    const afterCursor = xmlContent.substring(selectionEnd);
    
    // Find the partial text to replace
    const lines = beforeCursor.split('\n');
    const currentLine = lines[lines.length - 1];
    const tagStart = currentLine.lastIndexOf('<');
    const partialTag = currentLine.substring(tagStart + 1);
    
    const newContent = 
      beforeCursor.substring(0, beforeCursor.length - partialTag.length) +
      suggestion.insertText +
      afterCursor;
    
    setXmlContent(newContent);
    setShowSuggestions(false);
    
    // Focus back to textarea
    setTimeout(() => textarea.focus(), 0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const isXMLFile =
      file &&
      (file.type === 'text/xml' ||
        file.type === 'application/xml' ||
        file.name.toLowerCase().endsWith('.xml'));
    if (isXMLFile && file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setXmlContent(content);
        
        const errors = validateXML(content);
        setValidationErrors(errors);
        setIsValid(errors.length === 0);
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid XML file.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = () => {
    if (isValid && xmlContent.trim()) {
      onSubmit(xmlContent);
      localStorage.removeItem('xml-editor-draft');
      setXmlContent('');
      onClose();
      toast({
        title: "XML Submitted",
        description: "Your HIL task template has been submitted successfully.",
      });
    }
  };

  const insertTemplate = () => {
    const template = `<?xml version="1.0" encoding="UTF-8"?>
<HILTaskTemplate>
  <Name>Sample HIL Task</Name>
  <Description>A sample HIL task template</Description>
  <Service>DataAnnotation</Service>
  <ServiceType>Computer Vision</ServiceType>
  <AIPipeline>
    <NodeName>annotation-node</NodeName>
    <PipelineType>HIL</PipelineType>
  </AIPipeline>
  <Datahub>
    <DatasetType>Image</DatasetType>
    <DatahubInputDataType>Raw Images</DatahubInputDataType>
  </Datahub>
  <TaskReferences>
    <UnderstandingInputReferences>Image classification guidelines</UnderstandingInputReferences>
    <RequiredOutput>Annotated images with labels</RequiredOutput>
  </TaskReferences>
</HILTaskTemplate>`;
    setXmlContent(template);
    
    const errors = validateXML(template);
    setValidationErrors(errors);
    setIsValid(errors.length === 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Import XML Configuration</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('xml-file-input')?.click()}
              >
                <Upload className="w-4 h-4 mr-1" />
                Upload XML
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={insertTemplate}
              >
                Insert Template
              </Button>
              <input
                id="xml-file-input"
                type="file"
                accept=".xml"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <span>Line {cursorPosition.line}, Col {cursorPosition.column}</span>
              {validationErrors.length > 0 && (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.length} error(s)
                </div>
              )}
              {isValid && (
                <div className="flex items-center text-green-600">
                  <Check className="w-4 h-4 mr-1" />
                  Valid
                </div>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={xmlContent}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              className="w-full h-96 p-4 font-mono text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Paste your XML here or click 'Insert Template' to start with a sample..."
              spellCheck={false}
            />
            
            {/* Auto-complete suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-4 left-4 bg-white border border-slate-300 rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => insertSuggestion(suggestion)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 focus:bg-slate-100 border-b border-slate-100 last:border-b-0"
                  >
                    <span className="font-mono">&lt;{suggestion.label}&gt;</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-red-800 font-medium mb-2">Validation Errors:</h4>
              <ul className="space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-red-700 text-sm">
                    Line {error.line}, Column {error.column}: {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-blue-800 font-medium mb-2">Tips:</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Start typing &lt; to see available elements</li>
              <li>• Press Ctrl+Space for auto-complete suggestions</li>
              <li>• Upload an existing XML file or use the template to get started</li>
              <li>• All elements are optional and can be left empty</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isValid || !xmlContent.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Submit XML
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default XMLEditor;
