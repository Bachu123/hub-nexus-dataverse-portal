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
        id: 'policy-preparation',
        name: 'Policy Preparation',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 2, 2025, 09:00:00 AM',
        endTime: 'Jun 2, 2025, 09:00:05 AM',
        executionTime: 5,
        processedRecords: 1,
        latency: 50,
        memoryPeak: '256MB',
        input: { categories: ['safety', 'privacy'], policies: 3 },
        output: { policyIds: [1, 2, 3] }
      },
      {
        id: 'prompt-generation',
        name: 'Jailbreak Prompt Generation',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 2, 2025, 09:00:05 AM',
        endTime: 'Jun 2, 2025, 09:00:07 AM',
        executionTime: 2,
        processedRecords: 15,
        latency: 120,
        memoryPeak: '512MB',
        input: { seed: 'adversarial prompt' },
        output: { prompts: ['p1', 'p2'] }
      },
      {
        id: 'store-prompts',
        name: 'Store Prompts to DB',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 2, 2025, 09:00:07 AM',
        endTime: 'Jun 2, 2025, 09:00:08 AM',
        executionTime: 1,
        processedRecords: 15,
        latency: 80,
        memoryPeak: '128MB',
        input: { prompts: 15 },
        output: { stored: 15 }
      },
      {
        id: 'prompt-review',
        name: 'Prompt Review (HIL)',
        status: 'success',
        executedBy: 'user',
        startTime: 'Jun 2, 2025, 09:00:08 AM',
        endTime: 'Jun 2, 2025, 09:05:00 AM',
        executionTime: 292,
        processedRecords: 15,
        latency: 0,
        memoryPeak: '0GB',
        input: { prompts: 15 },
        output: { approved: 14, rejected: 1 }
      },
      {
        id: 'evaluation',
        name: 'Red Teaming Evaluation',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 2, 2025, 09:05:00 AM',
        endTime: 'Jun 2, 2025, 09:05:03 AM',
        executionTime: 3,
        processedRecords: 14,
        latency: 150,
        memoryPeak: '1GB',
        input: { prompts: 14 },
        output: { responses: 14 }
      },
      {
        id: 'violation-check',
        name: 'Violation Check',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 2, 2025, 09:05:03 AM',
        endTime: 'Jun 2, 2025, 09:05:04 AM',
        executionTime: 1,
        processedRecords: 14,
        latency: 60,
        memoryPeak: '256MB',
        input: { responses: 14 },
        output: { violations: 2 }
      },
      {
        id: 'fine-tune',
        name: 'Model Fine-Tuning',
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
    { timestamp: '2024-06-15T10:00:00Z', message: 'Policy categories selected', level: 'info' },
    { timestamp: '2024-06-15T10:00:02Z', message: 'Policy documents uploaded', level: 'info' },
    { timestamp: '2024-06-15T10:00:05Z', message: 'Jailbreak prompts generated', level: 'info' },
    { timestamp: '2024-06-15T10:00:07Z', message: 'Prompts stored in DB', level: 'info' },
    { timestamp: '2024-06-15T10:02:00Z', message: 'Prompts reviewed by HIL', level: 'info' },
    { timestamp: '2024-06-15T10:02:03Z', message: 'Evaluation API called', level: 'info' },
    { timestamp: '2024-06-15T10:02:04Z', message: 'Violations flagged', level: 'info' },
    { timestamp: '2024-06-15T10:02:05Z', message: 'Fine-tuning started', level: 'info' }
  ],
  'deepfake-detection': [
    { timestamp: '2024-06-16T09:45:01Z', message: 'Frame extraction started', level: 'info' },
    { timestamp: '2024-06-16T09:45:03Z', message: 'Classifier running', level: 'info' }
  ]
};
