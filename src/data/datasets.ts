
export interface DatasetFile {
  id: string;
  name: string;
  description: string;
  format: string;
  volume: string;
  evaluationReport: string;
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
    files: [
      {
        id: "234",
        name: "payment_details",
        description: "Test",
        format: "SQL",
        volume: "1000 Records",
        evaluationReport: "Overall Report"
      },
      {
        id: "222",
        name: "f1100_xvid.avi",
        description: "Test",
        format: "AVI",
        volume: "200 MB",
        evaluationReport: "Overall Report"
      },
      {
        id: "235",
        name: "customer_transactions",
        description: "Transaction history data",
        format: "CSV",
        volume: "5000 Records",
        evaluationReport: "Overall Report"
      },
      {
        id: "236",
        name: "user_behavior_logs",
        description: "User interaction logs",
        format: "JSON",
        volume: "150 MB",
        evaluationReport: "Overall Report"
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
