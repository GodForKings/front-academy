export type ApiErrorBody = {
  message?: string
}

export interface Role {
  id: string
  name: string
  description: string
  photo: string
}

export * from './skin'
export * from './userStat'
export * from './userTasks'
