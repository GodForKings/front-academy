import { Page } from '@/app/_providers'
import { StartingInformation } from '@/features'

export default function Registration() {
  return (
    <Page back={false}>
      <StartingInformation />
    </Page>
  )
}
