
export interface AIServiceTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  inputSchema: any;
  outputSchema: any;
  icon: string;
  version: string;
  isFineTuned?: boolean;
  baseModel?: string;
}

export const availableAIServices: AIServiceTemplate[] = [
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    description: 'AI service for summarizing long text content into concise summaries',
    category: 'NLP',
    inputSchema: { text: 'string', maxLength: 'number' },
    outputSchema: { summary: 'string', confidence: 'number' },
    icon: 'FileText',
    version: '1.2.0'
  },
  {
    id: 'image-classifier',
    name: 'Image Classifier',
    description: 'Deep learning model for image classification and object detection',
    category: 'Computer Vision',
    inputSchema: { image: 'base64', confidence_threshold: 'number' },
    outputSchema: { classes: 'array', probabilities: 'array' },
    icon: 'Camera',
    version: '2.1.0'
  },
  {
    id: 'sentiment-analyzer',
    name: 'Sentiment Analyzer',
    description: 'Analyze sentiment and emotion in text content',
    category: 'NLP',
    inputSchema: { text: 'string', language: 'string' },
    outputSchema: { sentiment: 'string', score: 'number', emotions: 'object' },
    icon: 'Heart',
    version: '1.0.0'
  },
  {
    id: 'voice-synthesis',
    name: 'Voice Synthesis',
    description: 'Convert text to natural-sounding speech',
    category: 'Audio',
    inputSchema: { text: 'string', voice: 'string', speed: 'number' },
    outputSchema: { audio_url: 'string', duration: 'number' },
    icon: 'Mic',
    version: '1.1.0'
  },
  {
    id: 'document-processor',
    name: 'Document Processor',
    description: 'Extract and process information from documents',
    category: 'NLP',
    inputSchema: { document: 'base64', format: 'string' },
    outputSchema: { extracted_text: 'string', metadata: 'object' },
    icon: 'FileType',
    version: '1.0.0'
  },
  {
    id: 'anomaly-detector',
    name: 'Anomaly Detector',
    description: 'Detect anomalies in time series data',
    category: 'ML',
    inputSchema: { data: 'array', threshold: 'number' },
    outputSchema: { anomalies: 'array', confidence: 'number' },
    icon: 'AlertTriangle',
    version: '1.5.0'
  }
];

export const getAIServiceById = (id: string) => {
  return availableAIServices.find(service => service.id === id);
};

export const getAIServicesByCategory = (category: string) => {
  return availableAIServices.filter(service => service.category === category);
};
