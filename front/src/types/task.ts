export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  icon?: string;
  title: string;
  description?: string;
  completed: boolean
  createdAt?: Date;
  updatedAt?: Date;
  status: Status;
}

