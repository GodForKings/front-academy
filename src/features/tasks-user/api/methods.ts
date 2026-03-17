import { api } from '@/shared'
import type { Task } from '@/shared/types'

/** Получить все задачи пользователя
 * @returns `Array<Task>`*/
export async function getMyTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>('/tasks/me')
  return data ?? []
}

export async function takeTask(taskId: string): Promise<Task> {
  const { data } = await api.post<Task>('/tasks/me', { taskId })
  return data
}
