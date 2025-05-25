export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  icon?: string;
  title: string;
  description?: string;
  createdAt: string;
  status: Status;
  isCompleted: boolean;
}

