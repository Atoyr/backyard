// profiles
export interface ProfileRow {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface ProfileInsert {
  id?: string
  email: string
  full_name?: string
  avatar_url?: string
}

export interface ProfileUpdate {
  id?: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

// user_settings
export interface UserSettingRow {
  id: string
  user_id: string
  setting_key: string
  setting_value: any // JSONB
  setting_type: string
  description: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface UserSettingInsert {
  id?: string
  user_id: string
  setting_key: string
  setting_value: any
  setting_type?: string
  description?: string | null
  is_public?: boolean
}

export interface UserSettingUpdate {
  id?: string
  user_id?: string
  setting_key?: string
  setting_value?: any
  setting_type?: string
  description?: string | null
  is_public?: boolean
  created_at?: string
  updated_at?: string
}

// user_setting_groups
export interface UserSettingGroupRow {
  id: string
  group_key: string
  group_name: string
  description: string | null
  display_order: number
  is_system: boolean
  created_at: string
}

export interface UserSettingGroupInsert {
  id?: string
  group_key: string
  group_name: string
  description?: string | null
  display_order?: number
  is_system?: boolean
  created_at?: string
}

export interface UserSettingGroupUpdate {
  id?: string
  group_key?: string
  group_name?: string
  description?: string | null
  display_order?: number
  is_system?: boolean
  created_at?: string
}

// user_setting_definitions
export interface UserSettingDefinitionRow {
  id: string
  setting_key: string
  group_key: string | null
  setting_name: string
  description: string | null
  setting_type: string
  default_value: any // JSONB
  validation_rules: any | null // JSONB
  display_order: number
  is_required: boolean
  is_public: boolean
  is_system: boolean
  created_at: string
  updated_at: string
}

export interface UserSettingDefinitionInsert {
  id?: string
  setting_key: string
  group_key?: string | null
  setting_name: string
  description?: string | null
  setting_type: string
  default_value: any
  validation_rules?: any | null
  display_order?: number
  is_required?: boolean
  is_public?: boolean
  is_system?: boolean
}

export interface UserSettingDefinitionUpdate {
  id?: string
  setting_key?: string
  group_key?: string | null
  setting_name?: string
  description?: string | null
  setting_type?: string
  default_value?: any
  validation_rules?: any | null
  display_order?: number
  is_required?: boolean
  is_public?: boolean
  is_system?: boolean
  created_at?: string
  updated_at?: string
}

// tasks
export interface TaskRow {
  id: string
  title: string
  description: string | null
  priority?: string
  time_period?: string // ISO 8601 duration
  parent_task_id?: string | null
  sort_order: number
  status: string
  due_date?: string
  completed?: boolean
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface TaskInsert {
  id?: string
  title: string
  description?: string | null
  priority?: string
  time_Period?: string // ISO 8601 duration
  parent_task_id?: string | null
  sort_order: number
  status: string
  due_date?: string
  completed?: boolean
  completed_at?: string
}

export interface TaskUpdate {
  id?: string
  title?: string
  description?: string | null
  priority?: string
  time_Period?: string // ISO 8601 duration
  parent_task_id?: string | null
  sort_order: number
  status: string
  due_date?: string
  completed?: boolean
  completed_at?: string
  updated_at?: string
}

// task_tags
export interface taskTagRow {
  id: string
  task_id: string
  tag_name: string
  color?: string | null
  created_at: string
  updated_at: string
}

export interface taskTagInsert {
  id?: string
  task_id: string
  tag_name: string
  color?: string | null
}

export interface taskTagUpdate {
  id?: string
  task_id: string
  tag_name: string
  color?: string | null
  updated_at?: string
}


// Database schema
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: ProfileInsert
        Update: ProfileUpdate
      }, 
      user_settings: {
        Row: UserSettingRow
        Insert: UserSettingInsert
        Update: UserSettingUpdate
      }, 
      user_setting_groups: {
        Row: UserSettingGroupRow
        Insert: UserSettingGroupInsert
        Update: UserSettingGroupUpdate
      }, 
      user_setting_definitions: {
        Row: UserSettingDefinitionRow
        Insert: UserSettingDefinitionInsert
        Update: UserSettingDefinitionUpdate
      }, 
      tasks: {
        Row: TaskRow
        Insert: TaskInsert
        Update: TaskUpdate
      }
    }
  }
}

