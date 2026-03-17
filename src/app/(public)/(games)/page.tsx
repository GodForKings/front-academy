import { Page } from '@/app/_providers'
import { ViewCases } from '@/features'

export default function Game() {
  return (
    <Page back={false}>
      <ViewCases />
    </Page>
  )
}
