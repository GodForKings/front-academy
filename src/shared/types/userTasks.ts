export type TaskStatus = 'pending' | 'completed' | 'failed' | null

export type TaskTab = 'social' | 'gaming'

export type Task = {
  id: string
  name: string | null
  description: string | null
  balance: number | null
  experience: number | null
  maxCompletions: number | null
  userCompletions: number | null
  type: string | null
  category: string | null
  taskStatus: TaskStatus
}

export type CheckMyTaskRequest = {
  taskId: string
}
