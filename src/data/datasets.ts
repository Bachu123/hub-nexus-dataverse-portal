
export interface HILTask {
  id: string;
  taskName: string;
  fileId: string;
  status: "pending" | "in-progress" | "completed" | "review-pending";
  createdDate: string;
  lastUpdated: string;
  assignedTo?: string;
  progress: number;
  taskType: string;
  priority: "low" | "medium" | "high";
}

export interface DatasetFile {
  id: string;
  name: string;
  description: string;
  format: string;
  volume: string;
  evaluationReport: string;
  usabilityScore: number;
  dataQuality: {
    completeness: number;
    accuracy: number;
    consistency: number;
    validity: number;
  };
  previewData?: any[];
  reportUrl?: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  author: string;
  updated: string;
  pipelines: number;
  rating: number;
  ratingCount: number;
  projects: number;
  tags: string[];
  useCases: string[];
  updateFrequency: string;
  files: DatasetFile[];
  hilTasks: HILTask[];
  overallUsabilityScore: number;
  dataFields: Array<{
    fieldName: string;
    dataType: string;
    description: string;
    exampleValues: string;
    constraints: string;
  }>;
}

export const datasets: Record<string, Dataset> = {
  "hav-df": {
    id: "hav-df",
    name: "Digitization impact on customer data",
    description: "A Digitization Impact on Customer Data Dataset tracks how digital transformation influences customer-related metrics, behaviors, and experiences. It typically includes data on digital transactions, online interactions, customer preferences, response times, conversion rates, and feedback before and after digitization efforts, helping businesses analyze the effectiveness of their digital initiatives.",
    author: "John wayne",
    updated: "10 Days ago",
    pipelines: 20,
    rating: 4.5,
    ratingCount: 560,
    projects: 5,
    tags: ["Centific"],
    useCases: ["Learning", "Application", "LLM Fine-Tuning", "Supervised Fine-Tuning", "Reinforcement learning from human feedback (RLHF)"],
    updateFrequency: "Daily",
    overallUsabilityScore: 87,
    files: [
      {
        id: "234",
        name: "payment_details",
        description: "Test",
        format: "SQL",
        volume: "1000 Records",
        evaluationReport: "Overall Report",
        usabilityScore: 92,
        dataQuality: {
          completeness: 95,
          accuracy: 88,
          consistency: 94,
          validity: 91
        },
        previewData: [
          { customer_id: "C12345", amount: 29.99, payment_method: "Credit Card", date: "2024-01-15" },
          { customer_id: "C67890", amount: 99.99, payment_method: "PayPal", date: "2024-01-16" },
          { customer_id: "C11111", amount: 49.99, payment_method: "Bank Transfer", date: "2024-01-17" }
        ],
        reportUrl: "/reports/payment_details_report.html"
      },
      {
        id: "222",
        name: "f1100_xvid.avi",
        description: "Test",
        format: "AVI",
        volume: "200 MB",
        evaluationReport: "Overall Report",
        usabilityScore: 76,
        dataQuality: {
          completeness: 80,
          accuracy: 75,
          consistency: 78,
          validity: 72
        },
        reportUrl: "/reports/video_file_report.html"
      },
      {
        id: "235",
        name: "customer_transactions",
        description: "Transaction history data",
        format: "CSV",
        volume: "5000 Records",
        evaluationReport: "Overall Report",
        usabilityScore: 89,
        dataQuality: {
          completeness: 92,
          accuracy: 87,
          consistency: 90,
          validity: 88
        },
        previewData: [
          { transaction_id: "T001", customer_id: "C12345", amount: 150.00, category: "Electronics" },
          { transaction_id: "T002", customer_id: "C67890", amount: 75.50, category: "Clothing" },
          { transaction_id: "T003", customer_id: "C11111", amount: 200.25, category: "Home & Garden" }
        ],
        reportUrl: "/reports/customer_transactions_report.html"
      },
      {
        id: "236",
        name: "user_behavior_logs",
        description: "User interaction logs",
        format: "JSON",
        volume: "150 MB",
        evaluationReport: "Overall Report",
        usabilityScore: 84,
        dataQuality: {
          completeness: 88,
          accuracy: 82,
          consistency: 85,
          validity: 81
        },
        previewData: [
          { user_id: "U001", action: "click", element: "button_signup", timestamp: "2024-01-15T10:30:00Z" },
          { user_id: "U002", action: "scroll", element: "homepage", timestamp: "2024-01-15T10:31:15Z" },
          { user_id: "U003", action: "form_submit", element: "contact_form", timestamp: "2024-01-15T10:32:45Z" }
        ],
        reportUrl: "/reports/user_behavior_logs_report.html"
      }
    ],
    hilTasks: [
      {
        id: "HIL001",
        taskName: "Data Validation - Payment Details",
        fileId: "234",
        status: "completed",
        createdDate: "2024-01-10",
        lastUpdated: "2024-01-12",
        assignedTo: "Sarah Johnson",
        progress: 100,
        taskType: "Data Validation",
        priority: "high"
      },
      {
        id: "HIL002",
        taskName: "Quality Check - Customer Transactions",
        fileId: "235",
        status: "in-progress",
        createdDate: "2024-01-14",
        lastUpdated: "2024-01-16",
        assignedTo: "Mike Chen",
        progress: 65,
        taskType: "Quality Assurance",
        priority: "medium"
      },
      {
        id: "HIL003",
        taskName: "Annotation Review - User Behavior",
        fileId: "236",
        status: "pending",
        createdDate: "2024-01-15",
        lastUpdated: "2024-01-15",
        progress: 0,
        taskType: "Annotation",
        priority: "low"
      }
    ],
    dataFields: [
      {
        fieldName: "Customer ID",
        dataType: "String",
        description: "Unique identifier for each customer",
        exampleValues: "C12345, C67890",
        constraints: "Non-null, Unique"
      },
      {
        fieldName: "Gender",
        dataType: "Categorical",
        description: "Gender of the customer",
        exampleValues: "Male, Female",
        constraints: "Non-null, [Male, Female]"
      },
      {
        fieldName: "Age",
        dataType: "Integer",
        description: "Age of the customer",
        exampleValues: "25, 45",
        constraints: ">= 18"
      },
      {
        fieldName: "Monthly Charges",
        dataType: "Float",
        description: "Monthly subscription charges",
        exampleValues: "29.99, 99.99",
        constraints: "Non-null, >= 0"
      },
      {
        fieldName: "Contract Type",
        dataType: "Categorical",
        description: "Type of subscription contract",
        exampleValues: "Month-to-Month, Annual",
        constraints: "Non-null, Fixed values"
      },
      {
        fieldName: "Churn",
        dataType: "Boolean",
        description: "Indicates if the customer has churned",
        exampleValues: "True, False",
        constraints: "Non-null"
      },
      {
        fieldName: "Tenure",
        dataType: "Integer",
        description: "Number of months the customer has been with the company",
        exampleValues: "1, 24",
        constraints: "Non-null, >= 0"
      }
    ]
  }
};
