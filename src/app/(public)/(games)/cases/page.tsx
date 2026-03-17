import { PAGES } from '@/widgets'
import { redirect } from 'next/navigation'

export default function Cases() {
  redirect(PAGES.GAMES)
}
