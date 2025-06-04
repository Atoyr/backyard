export type Status = 'todo' | 'in_progress' | 'done' | 'pending' | 'archived' ;
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  icon?: string;
  title: string;
  description?: string;
  priority: Priority;
  timePeriod?: string; // ISO 8601 duration
  parentTaskId?: string | null;
  sortOrder?: number;
  status: Status;
  dueDate?: Date | null;
  completed?: boolean;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

