import {
  backButton,
  initData,
  init as initSDK,
  miniApp,
  swipeBehavior,
  viewport,
} from '@tma.js/sdk-react'

export function init(isMobile: boolean): void {
  initSDK()

  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error('ERR_NOT_SUPPORTED')
  }

  backButton.mount()

  miniApp.mount()
  miniApp.bindCssVars()

  initData.restore()

  void viewport
    .mount()
    .catch((e) => {
      console.error('Something went wrong mounting the viewport', e)
    })
    .then(() => {
      viewport.bindCssVars()
      if (viewport.expand.isAvailable()) {
        viewport.expand()
      }
      /* FullScreen только на мобиле */
      if (viewport.requestFullscreen.isAvailable() && isMobile) {
        viewport.requestFullscreen()
      }
      if (swipeBehavior.mount.isAvailable()) {
        swipeBehavior.mount()
      }
      if (swipeBehavior.disableVertical.isAvailable()) {
        swipeBehavior.disableVertical()
      }
    })
}
