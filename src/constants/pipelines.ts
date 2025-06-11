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

export const pipelineTemplates: Record<string, Pipeline> = {
  'red-teaming': {
    id: 'red-teaming',
    name: 'Red Teaming',
    description: 'Detect policy violations by prompting a model with adversarial inputs.',
    lastExecutionStatus: 'success',
    lastExecutionTime: '2024-06-15 10:00',
    availableFiles: 20,
    processedFiles: 20,
    remainingFiles: 0,
    aiServices: [
      {
        id: 'prompt-generator',
        name: 'Prompt Generator',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 2, 2025, 09:00:00 AM',
        endTime: 'Jun 2, 2025, 09:00:01 AM',
        executionTime: 1,
        processedRecords: 10,
        latency: 100,
        memoryPeak: '512MB',
        input: { seed: 'adversarial prompt' },
        output: { prompts: ['attack 1', 'attack 2'] }
      },
      {
        id: 'llm-response',
        name: 'LLM Response',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 2, 2025, 09:00:01 AM',
        endTime: 'Jun 2, 2025, 09:00:03 AM',
        executionTime: 2,
        processedRecords: 10,
        latency: 200,
        memoryPeak: '1GB',
        input: { model: 'gpt-4', prompts: ['attack 1', 'attack 2'] },
        output: { responses: ['resp1', 'resp2'] }
      },
      {
        id: 'toxicity-check',
        name: 'Toxicity Check',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 2, 2025, 09:00:03 AM',
        endTime: 'Jun 2, 2025, 09:00:04 AM',
        executionTime: 1,
        processedRecords: 10,
        latency: 100,
        memoryPeak: '256MB',
        input: { text: ['resp1', 'resp2'] },
        output: { toxic: [false, true] }
      }
    ],
    executions: [
      {
        id: 'exec-100',
        type: 'Manual',
        executedBy: 'tester@company.com',
        startDate: '2024-06-15 10:00:00',
        endDate: '2024-06-15 10:00:05',
        status: 'success',
        records: []
      }
    ]
  },
  'deepfake-detection': {
    id: 'deepfake-detection',
    name: 'Deepfake Detection',
    description: 'Identify manipulated media files in a dataset.',
    lastExecutionStatus: 'running',
    lastExecutionTime: '2024-06-16 09:45',
    availableFiles: 100,
    processedFiles: 40,
    remainingFiles: 60,
    aiServices: [
      {
        id: 'frame-extraction',
        name: 'Frame Extraction',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 2, 2025, 11:00:00 AM',
        endTime: 'Jun 2, 2025, 11:00:02 AM',
        executionTime: 2,
        processedRecords: 40,
        latency: 200,
        memoryPeak: '2GB',
        input: { video: 'input.mp4' },
        output: { frames: 100 }
      },
      {
        id: 'deepfake-classifier',
        name: 'Deepfake Classifier',
        status: 'running',
        executedBy: 'system',
        startTime: 'Jun 2, 2025, 11:00:02 AM',
        executionTime: 0,
        processedRecords: 0,
        latency: 0,
        memoryPeak: '0GB',
        input: { frames: 100 },
        output: null
      },
      {
        id: 'reporting',
        name: 'Reporting',
        status: 'pending',
        executedBy: 'system',
        startTime: '',
        executionTime: 0,
        processedRecords: 0,
        latency: 0,
        memoryPeak: '0GB',
        input: {},
        output: null
      }
    ],
    executions: [
      {
        id: 'exec-200',
        type: 'Scheduler',
        executedBy: 'system',
        startDate: '2024-06-16 09:45:00',
        endDate: '',
        status: 'running',
        records: []
      }
    ]
  }
};

export const pipelineLogs: Record<string, Array<{ timestamp: string; message: string; level: 'info' | 'error' | 'warn' }>> = {
  'red-teaming': [
    { timestamp: '2024-06-15T10:00:01Z', message: 'Prompt generator executed', level: 'info' },
    { timestamp: '2024-06-15T10:00:03Z', message: 'LLM produced responses', level: 'info' },
    { timestamp: '2024-06-15T10:00:04Z', message: 'Toxicity check completed', level: 'info' }
  ],
  'deepfake-detection': [
    { timestamp: '2024-06-16T09:45:01Z', message: 'Frame extraction started', level: 'info' },
    { timestamp: '2024-06-16T09:45:03Z', message: 'Classifier running', level: 'info' }
  ]
};
