import type { ComponentType } from 'react'

import type { IconProps } from '@/shared'

export interface NavigationPage {
  title: string
  link: string
  icon: ComponentType<IconProps>
}

export type RegistrationStep = 'email' | 'phone' | 'choice-role' | 'link-platforms'
