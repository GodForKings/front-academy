import { createEvent, createStore } from 'effector'

import type { Modal } from './types'

export const openModal = createEvent<Omit<Modal, 'isOpen'>>()
export const closeModal = createEvent()

const CLEAR_CONTENT: Modal = {
  isOpen: false,
  content: null,
  className: null,
}

export const $modalState = createStore<Modal>(CLEAR_CONTENT)
  .on(openModal, (_, { content, className }) => ({
    isOpen: true,
    content,
    className: className ?? '',
  }))
  .on(closeModal, () => CLEAR_CONTENT)

export const $isModalOpen = $modalState.map((state) => state.isOpen)
export const $modalContent = $modalState.map((state) => state.content)
export const $modalClassName = $modalState.map((state) => state.className)
