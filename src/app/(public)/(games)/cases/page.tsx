import { redirect } from 'next/navigation'

import { PAGES } from '@/widgets'

export default function Cases() {
  redirect(PAGES.GAMES)
}
