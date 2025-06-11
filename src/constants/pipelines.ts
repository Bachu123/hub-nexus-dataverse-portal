export interface AIService {
  id: string;
  name: string;
  status: 'success' | 'failed' | 'running' | 'pending';
  executedBy: string;
  startTime: string;
  endTime?: string;
  executionTime: number; // in seconds
  processedRecords: number;
  latency: number; // in ms
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
    lastExecutionTime: '2025-06-15 10:05',
    availableFiles: 20,
    processedFiles: 20,
    remainingFiles: 0,
    aiServices: [
      {
        id: 'policy-preparation',
        name: 'Policy Preparation',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 15, 2025, 10:00:00 AM',
        endTime: 'Jun 15, 2025, 10:00:05 AM',
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
        startTime: 'Jun 15, 2025, 10:00:05 AM',
        endTime: 'Jun 15, 2025, 10:00:07 AM',
        executionTime: 2,
        processedRecords: 15,
        latency: 120,
        memoryPeak: '512MB',
        input: { seed: 'adversarial prompt' },
        output: { prompts: ['p1', 'p2', '...'] }
      },
      {
        id: 'store-prompts',
        name: 'Store Prompts to DB',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 15, 2025, 10:00:07 AM',
        endTime: 'Jun 15, 2025, 10:00:08 AM',
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
        executedBy: 'human-reviewer@company.com',
        startTime: 'Jun 15, 2025, 10:00:08 AM',
        endTime: 'Jun 15, 2025, 10:05:00 AM',
        executionTime: 292,
        processedRecords: 15,
        latency: 0,
        memoryPeak: 'N/A',
        input: { prompts: 15 },
        output: { approved: 14, rejected: 1 },
        hilData: { sent: 15, received: 15, pending: 0 }
      },
      {
        id: 'evaluation',
        name: 'Red Teaming Evaluation',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 15, 2025, 10:05:00 AM',
        endTime: 'Jun 15, 2025, 10:05:03 AM',
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
        startTime: 'Jun 15, 2025, 10:05:03 AM',
        endTime: 'Jun 15, 2025, 10:05:04 AM',
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
        endTime: '',
        executionTime: 0,
        processedRecords: 0,
        latency: 0,
        memoryPeak: 'N/A',
        input: { violations: 2 },
        output: null
      }
    ],
    executions: [
      {
        id: 'exec-100',
        type: 'Manual',
        executedBy: 'tester@company.com',
        startDate: '2025-06-15 10:00:00',
        endDate: '2025-06-15 10:05:05',
        status: 'success',
        records: []
      }
    ]
  },
  'deepfake-detection': {
    id: 'deepfake-detection',
    name: 'Deepfake Detection',
    description: 'Identify manipulated media files in a dataset by analyzing various visual features.',
    lastExecutionStatus: 'running',
    lastExecutionTime: '2025-06-17 11:30',
    availableFiles: 100,
    processedFiles: 25,
    remainingFiles: 75,
    aiServices: [
      {
        id: 'frame-extraction',
        name: 'Preprocessing: Video to Frames',
        status: 'success',
        executedBy: 'system',
        startTime: 'Jun 17, 2025, 11:30:00 AM',
        endTime: 'Jun 17, 2025, 11:32:15 AM',
        executionTime: 135,
        processedRecords: 100,
        latency: 1350,
        memoryPeak: '2GB',
        input: { videoFiles: 100 },
        output: { frameBatches: 100 }
      },
      {
        id: 'face-detector',
        name: 'Feature Extraction: Face Detector',
        status: 'running',
        executedBy: 'system',
        startTime: 'Jun 17, 2025, 11:32:15 AM',
        endTime: '',
        executionTime: 180,
        processedRecords: 60,
        latency: 3000,
        memoryPeak: '4GB',
        input: { frameBatches: 100 },
        output: null
      },
      {
        id: 'lip-sync-analyzer',
        name: 'Feature Extraction: Lip Sync Analyzer',
        status: 'running',
        executedBy: 'system',
        startTime: 'Jun 17, 2025, 11:32:15 AM',
        endTime: '',
        executionTime: 180,
        processedRecords: 55,
        latency: 3270,
        memoryPeak: '3.5GB',
        input: { frameBatches: 100 },
        output: null
      },
      {
        id: 'optical-flow',
        name: 'Feature Extraction: Optical Flow',
        status: 'running',
        executedBy: 'system',
        startTime: 'Jun 17, 2025, 11:32:15 AM',
        endTime: '',
        executionTime: 180,
        processedRecords: 62,
        latency: 2900,
        memoryPeak: '5GB',
        input: { frameBatches: 100 },
        output: null
      },
      {
        id: 'aggregate-scores',
        name: 'Aggregate Scores',
        status: 'pending',
        executedBy: 'system',
        startTime: '',
        endTime: '',
        executionTime: 0,
        processedRecords: 0,
        latency: 0,
        memoryPeak: 'N/A',
        input: { scores: ['face', 'lip', 'flow'] },
        output: null
      },
      {
        id: 'generate-verdict',
        name: 'Generate Final Verdict',
        status: 'pending',
        executedBy: 'system',
        startTime: '',
        endTime: '',
        executionTime: 0,
        processedRecords: 0,
        latency: 0,
        memoryPeak: 'N/A',
        input: { aggregatedScore: 'number' },
        output: null
      },
      {
        id: 'reporting',
        name: 'Deepfake Detection Report',
        status: 'pending',
        executedBy: 'system',
        startTime: '',
        endTime: '',
        executionTime: 0,
        processedRecords: 0,
        latency: 0,
        memoryPeak: 'N/A',
        input: { verdict: 'object' },
        output: null
      }
    ],
    executions: [
      {
        id: 'exec-201',
        type: 'Scheduler',
        executedBy: 'system',
        startDate: '2025-06-17 11:30:00',
        endDate: '',
        status: 'running',
        records: []
      }
    ]
  }
};

export const pipelineLogs: Record<string, Array<{ timestamp: string; message: string; level: 'info' | 'error' | 'warn' }>> = {
  'red-teaming': [
    { timestamp: '2025-06-15T10:00:00Z', message: 'Manual execution of Red Teaming pipeline initiated by tester@company.com.', level: 'info' },
    { timestamp: '2025-06-15T10:00:01Z', message: 'Policy Preparation started. Reading 3 policy documents.', level: 'info' },
    { timestamp: '2025-06-15T10:00:05Z', message: 'Policy Preparation successful.', level: 'info' },
    { timestamp: '2025-06-15T10:00:06Z', message: 'Generating 15 jailbreak prompts.', level: 'info' },
    { timestamp: '2025-06-15T10:00:07Z', message: 'Prompts generated. Storing to database.', level: 'info' },
    { timestamp: '2025-06-15T10:00:08Z', message: 'Prompts stored. Sending 15 prompts for Human-in-the-Loop review.', level: 'info' },
    { timestamp: '2025-06-15T10:00:09Z', message: 'Awaiting HIL review. This may take some time.', level: 'warn' },
    { timestamp: '2025-06-15T10:05:00Z', message: 'HIL review completed by human-reviewer@company.com. Approved: 14, Rejected: 1.', level: 'info' },
    { timestamp: '2025-06-15T10:05:01Z', message: 'Starting evaluation for 14 approved prompts.', level: 'info' },
    { timestamp: '2025-06-15T10:05:03Z', message: 'Evaluation API call successful.', level: 'info' },
    { timestamp: '2025-06-15T10:05:04Z', message: 'Violation check completed. 2 violations flagged.', level: 'info' },
    { timestamp: '2025-06-15T10:05:05Z', message: 'Red Teaming pipeline finished successfully.', level: 'info' },
    { timestamp: '2025-06-15T10:05:06Z', message: 'Model fine-tuning is now pending user approval based on 2 violations.', level: 'warn' }
  ],
  'deepfake-detection': [
    { timestamp: '2025-06-17T11:30:00Z', message: 'Scheduled execution of Deepfake Detection pipeline started.', level: 'info' },
    { timestamp: '2025-06-17T11:30:01Z', message: 'Preprocessing: Video to Frames started for 100 available files.', level: 'info' },
    { timestamp: '2025-06-17T11:31:00Z', message: 'Preprocessing: Processed 50/100 files.', level: 'info' },
    { timestamp: '2025-06-17T11:32:15Z', message: 'Preprocessing complete. Starting parallel feature extraction.', level: 'info' },
    { timestamp: '2025-06-17T11:32:16Z', message: 'Feature Extraction: Face Detector started.', level: 'info' },
    { timestamp: '2025-06-17T11:32:17Z', message: 'Feature Extraction: Lip Sync Analyzer started.', level: 'info' },
    { timestamp: '2025-06-17T11:32:18Z', message: 'Feature Extraction: Optical Flow started.', level: 'info' },
    { timestamp: '2025-06-17T11:34:00Z', message: 'Face Detector progress: 60/100 batches processed.', level: 'info' },
    { timestamp: '2025-06-17T11:34:05Z', message: 'Optical Flow is using high memory: 4.8GB. Monitoring performance.', level: 'warn' }
  ]
};