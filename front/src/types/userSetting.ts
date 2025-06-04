export type Theme = 'light' | 'dark' | 'auto'

export interface UserSetting {
  maxHour: number
  timezone: string
  theme: string
  tasksPerPage: number
}

