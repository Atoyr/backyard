import type { TaskRow } from '@/types/database'
import type { Task, Priority, Status } from '@/types/task'

export const transformTaskRowToModel = (row: TaskRow): Task => ({
  id: row.id,
  icon: undefined, // FIXME Assuming icon is not present in TaskRow
  title: row.title,
  description: row.description || undefined,
  priority: row.priority as Priority || 'medium' as Priority, // FIXME Default to 'medium' if not provided
  timePeriod: row.time_period || undefined, // Assuming time_period is optional
  parentTaskId: row.parent_task_id || undefined, // Assuming parent_task_id is optional
  sortOrder: row.sort_order || undefined, // Assuming sort_order is optional
  status: row.status as Status, 

  completed: row.completed,
  completedAt: row.completed_at ? new Date(row.completed_at) : undefined, // Assuming completed_at is optional
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

// export const transformTaskModelToInsert = (task: Partial<Task>): TaskInsert => ({
//   title: task.title!,
//   description: task.description || null,
//   completed: task.completed || false
// })
// 
// export const transformTasksRowsToModels = (rows: TaskRow[]): Task[] => {
//   return rows.map(transformTaskRowToModel)
// }
