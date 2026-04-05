'use client'

import { sample } from 'effector'
import { createGate } from 'effector-react'

import { fetchTasks } from './userTasksList'

export const TasksGate = createGate()

sample({
  clock: TasksGate.open,
  target: fetchTasks,
})
