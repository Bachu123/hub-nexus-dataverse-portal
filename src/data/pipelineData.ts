
export interface AIService {
  id: string;
  name: string;
  status: 'success' | 'failed' | 'running' | 'pending';
  executedBy: string;
  startTime: string;
  endTime?: string;
  executionTime: number;
  processedRecords: number;
  latency: number;
  memoryPeak: string;
  input: any;
  output: any;
  hilData?: {
    sent: number;
    received: number;
    pending: number;
  };
  errorMessage?: string;
}

export interface PipelineExecution {
  id: string;
  type: 'Scheduler' | 'Manual' | 'API';
  executedBy: string;
  startDate: string;
  endDate: string;
  status: 'success' | 'failed' | 'running';
  records: Array<{
    id: string;
    inputLink: string;
    outputLink: string;
  }>;
}

export interface Pipeline {
  id: string;
  name: string;
  description: string;
  aiServices: AIService[];
  lastExecutionStatus: 'success' | 'failed' | 'running';
  lastExecutionTime: string;
  availableFiles: number;
  processedFiles: number;
  remainingFiles: number;
  executions: PipelineExecution[];
}

export const mockPipelines: Record<string, Pipeline> = {
  'pip-001': {
    id: 'pip-001',
    name: 'Video and Audio Transcription',
    description: 'Process and validate customer data through ML pipeline',
    lastExecutionStatus: 'failed',
    lastExecutionTime: '2024-06-15 14:30',
    availableFiles: 150,
    processedFiles: 120,
    remainingFiles: 30,
    aiServices: [
      {
        id: 'generation',
        name: 'Generation',
        status: 'success',
        executedBy: 'LoopAutomationUser System',
        startTime: 'Jun 2, 2025, 10:16:51 AM',
        endTime: 'Jun 2, 2025, 10:16:52 AM',
        executionTime: 1.2,
        processedRecords: 45,
        latency: 120,
        memoryPeak: '2.4GB',
        input: { type: 'video', format: 'mp4', duration: '00:15:30' },
        output: { transcription: 'Generated transcription text...', confidence: 0.95 }
      },
      {
        id: 'reader',
        name: 'Reader',
        status: 'success',
        executedBy: 'LoopAutomationUser System',
        startTime: 'Jun 2, 2025, 10:16:52 AM',
        endTime: 'Jun 2, 2025, 10:16:53 AM',
        executionTime: 0.8,
        processedRecords: 45,
        latency: 80,
        memoryPeak: '1.8GB',
        input: { files: ['input1.mp4', 'input2.mp4'] },
        output: { processedFiles: 45, status: 'completed' }
      },
      {
        id: 'rag-fusion',
        name: 'Rag Fusion',
        status: 'success',
        executedBy: 'LoopAutomationUser System',
        startTime: 'Jun 2, 2025, 10:16:53 AM',
        endTime: 'Jun 2, 2025, 10:16:54 AM',
        executionTime: 1.5,
        processedRecords: 45,
        latency: 150,
        memoryPeak: '3.2GB',
        input: { queries: ['query1', 'query2'], context: 'document_context' },
        output: { fusedResults: ['result1', 'result2'], relevanceScore: 0.92 }
      },
      {
        id: 'query-embedding',
        name: 'Query Embedding',
        status: 'failed',
        executedBy: 'LoopAutomationUser System',
        startTime: 'Jun 2, 2025, 10:16:54 AM',
        endTime: 'Jun 2, 2025, 10:16:55 AM',
        executionTime: 0,
        processedRecords: 0,
        latency: 0,
        memoryPeak: '0GB',
        input: { query: 'embedding query', model: 'text-embedding-ada-002' },
        output: null,
        errorMessage: 'Connection timeout to embedding service. Please check network connectivity and try again.'
      },
      {
        id: 'prompt-engineering',
        name: 'Prompt Engineering',
        status: 'success',
        executedBy: 'LoopAutomationUser System',
        startTime: 'Jun 2, 2025, 10:16:55 AM',
        endTime: 'Jun 2, 2025, 10:16:56 AM',
        executionTime: 2.1,
        processedRecords: 45,
        latency: 210,
        memoryPeak: '4.1GB',
        input: { prompts: ['prompt1', 'prompt2'], temperature: 0.7 },
        output: { generatedText: 'Engineered prompt output...', tokens: 1500 }
      },
      {
        id: 'llm-model',
        name: 'LLM Model',
        status: 'success',
        executedBy: 'LoopAutomationUser System',
        startTime: 'Jun 2, 2025, 10:16:56 AM',
        endTime: 'Jun 2, 2025, 10:16:58 AM',
        executionTime: 2.8,
        processedRecords: 45,
        latency: 280,
        memoryPeak: '6.5GB',
        input: { model: 'gpt-4', prompt: 'Process the following data...', maxTokens: 2000 },
        output: { response: 'Model generated response...', totalTokens: 1850 }
      }
    ],
    executions: [
      {
        id: 'exec-001',
        type: 'Manual',
        executedBy: 'john.doe@company.com',
        startDate: '2024-06-15 14:30:00',
        endDate: '2024-06-15 14:35:00',
        status: 'success',
        records: [
          { id: 'rec-001', inputLink: '/api/data/input/rec-001.json', outputLink: '/api/data/output/rec-001.json' },
          { id: 'rec-002', inputLink: '/api/data/input/rec-002.json', outputLink: '/api/data/output/rec-002.json' }
        ]
      },
      {
        id: 'exec-002',
        type: 'Scheduler',
        executedBy: 'system',
        startDate: '2024-06-15 12:00:00',
        endDate: '2024-06-15 12:08:00',
        status: 'failed',
        records: []
      }
    ]
  }
};

export const mockLogs: Record<string, Array<{ timestamp: string; message: string; level: 'info' | 'error' | 'warn' }>> = {
  'pip-001': [
    { timestamp: '2024-06-15T14:30:01Z', message: 'Pipeline execution started', level: 'info' },
    { timestamp: '2024-06-15T14:30:02Z', message: 'Generation service initialized', level: 'info' },
    { timestamp: '2024-06-15T14:30:05Z', message: 'Processing video file: input1.mp4', level: 'info' },
    { timestamp: '2024-06-15T14:30:08Z', message: 'Transcription completed with 95% confidence', level: 'info' },
    { timestamp: '2024-06-15T14:30:10Z', message: 'Reader service processing 45 files', level: 'info' },
    { timestamp: '2024-06-15T14:30:15Z', message: 'RAG Fusion combining results', level: 'info' },
    { timestamp: '2024-06-15T14:30:18Z', message: 'Connection timeout to embedding service', level: 'error' },
    { timestamp: '2024-06-15T14:30:19Z', message: 'Retrying embedding service connection...', level: 'warn' },
    { timestamp: '2024-06-15T14:30:22Z', message: 'Embedding service connection failed', level: 'error' },
    { timestamp: '2024-06-15T14:30:25Z', message: 'Pipeline execution completed with errors', level: 'error' }
  ]
};
