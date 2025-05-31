import type { TaskRow } from '@/types/database'
import type { Task } from '@/types/task'

export const transformTaskRowToModel = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  description: row.description || undefined,
  completed: row.completed,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
  status: row.completed ? 'done' : 'todo',
})

// export const transformTaskModelToInsert = (task: Partial<Task>): TaskInsert => ({
//   title: task.title!,
//   description: task.description || null,
//   completed: task.completed || false
// })
// 
// export const transformTasksRowsToModels = (rows: TaskRow[]): Task[] => {
//   return rows.map(transformTaskRowToModel)
// }
