import { toastModels } from '@/entities'
import { Task } from '@/shared/types'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { getMyTasks, takeTask } from '../api/methods'

/* Эффекты */
export const fetchTasksFx = createEffect(getMyTasks)
export const takeTaskFx = createEffect(takeTask)

/* События */
export const fetchTasks = createEvent()
export const checkTask = createEvent<string>() // taskId
/* Reward task flow */
const showSuccess = createEvent<number>()
export const hideSuccess = createEvent()

const setTasks = createEvent<Task[]>()
const updateTaskInList = createEvent<Task>()
const setCheckingId = createEvent<string | null>()

/* Хранилища */
export const $tasks = createStore<Task[]>([])
  .on(setTasks, (_, tasksData) => tasksData)
  .on(updateTaskInList, (tasks, updated) => tasks.map((t) => (t.id === updated.id ? updated : t)))

export const $tasksLoading = fetchTasksFx.pending
export const $checkLoading = takeTaskFx.pending

/** чтобы в UI отключать конкретную кнопку (и/или показывать лоадер) */
export const $checkingTaskId = createStore<string | null>(null)
  .on(setCheckingId, (_, id) => id)
  .reset(takeTaskFx.finally)
/** Поинты за успех в Задаче */
export const $successReward = createStore<number | null>(null)
  .on(showSuccess, (_, reward) => reward)
  .reset(hideSuccess)

/* Events => Effects */
sample({
  clock: fetchTasks,
  target: fetchTasksFx,
})

/* Effects => Stores */
sample({
  clock: fetchTasksFx.doneData,
  target: setTasks,
})

/* check click => guard (нельзя чекать completed и нельзя во время pending) */
sample({
  clock: checkTask,
  source: { tasks: $tasks, pending: $checkLoading },
  filter: ({ tasks, pending }, taskId) => {
    if (pending) return false
    const task = tasks.find((task) => task.id === taskId)
    if (!task) return false
    return task.taskStatus !== 'completed' && task.taskStatus !== 'pending'
  },
  fn: (_, taskId) => taskId,
  target: setCheckingId,
})

sample({
  clock: checkTask,
  source: { tasks: $tasks, pending: $checkLoading },
  filter: ({ tasks, pending }, taskId) => {
    if (pending) return false
    const task = tasks.find((task) => task.id === taskId)
    if (!task) return false
    return task.taskStatus !== 'completed' && task.taskStatus !== 'pending'
  },
  fn: (_, taskId) => taskId,
  target: takeTaskFx,
})

/* POST вернул true => помечаем completed */
sample({
  clock: takeTaskFx.doneData,
  target: updateTaskInList,
})
/* Check вернул true => достаем поинты задачи и показываем TaskSuccess */
sample({
  clock: takeTaskFx.doneData,
  filter: (task) => task.taskStatus === 'completed',
  fn: (task) => task.balance ?? 0,
  target: showSuccess,
})

/* Под UI */
sample({
  clock: takeTaskFx.failData,
  fn: () => 'Не удалось проверить задание',
  target: toastModels.events.showError,
})

sample({
  clock: fetchTasksFx.failData,
  fn: () => 'Не удалось получить задания',
  target: toastModels.events.showError,
})

/* Units */
export const tasksModels = {
  events: {
    fetchTasks,
    checkTask,
    hideSuccess,
  },
  stores: {
    $tasks,
    $tasksLoading,
    $checkLoading,
    $checkingTaskId,
    $successReward,
  },
  effects: {
    fetchTasksFx,
    takeTaskFx,
  },
}
