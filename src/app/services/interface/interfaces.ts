

export interface response {
    success:boolean,
    data:unknown
}

export interface UserProfile<T> {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  sex: "Male" | "Female" | string;
  role: string;
  jobtitle: string;
  experience: string;
  hiredate: string; // ISO Date String
  
  // Bank & Payment Details
  bankname: string;
  bank_code: string;
  account_number: string;
  type: "nuban" | string;
  amount: string; // Note: Amount is a string in your data
  recipient: any | null;
  payment: any[]; 
  
  // Identifiers / Relations
  department: string; 
  position: string;  
  salary: string;
  
  // Nested Objects
  employee_department: T;
  user_position: T;

  // Security & Media
  profileimage: string;
  password?: string; // Optional as you might not want to pass this around

  // Timestamps
  createdAt: string;
  updatedAt: string;
}