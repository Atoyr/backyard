export interface TaskRow {
  id: string
  title: string
  description: string | null
  completed: boolean
  created_at: string
  updated_at: string
}

export interface TaskInsert {
  id?: string
  title: string
  description?: string | null
  completed?: boolean
  created_at?: string
  updated_at?: string
}

export interface TaskUpdate {
  id?: string
  title?: string
  description?: string | null
  completed?: boolean
  updated_at?: string
}

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: TaskRow
        Insert: TaskInsert
        Update: TaskUpdate
      }
    }
  }
}

