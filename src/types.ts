export interface Material {
  id: string;
  name: string;
  url: string;
}

export interface Summary {
  id: string;
  userId: string;
  title: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number; 
  content: string;
  studyDate?: string; 
  links: Material[];
  completed: boolean;
  
}

export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
  password?: string; 
}

export interface SummaryInput extends Omit<Summary, 'id' | 'userId'> {}