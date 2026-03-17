import { Button, InfoBlock, cn } from '@/shared'
import type { FC } from 'react'

interface AccountRowProps {
  icon: string
  title: string
  subtitle: string
  buttonClassName: string
  connected: boolean
  loading: boolean
  onClick: () => void
  tConnect: string
  tConnected: string
  tDisconnect?: string
}

export const AccountRow: FC<AccountRowProps> = (props) => {
  const {
    icon,
    title,
    subtitle,
    buttonClassName,
    connected,
    loading,
    onClick,
    tConnect,
    tConnected,
    tDisconnect,
  } = props

  const buttonText = connected ? (tDisconnect ?? tConnected) : tConnect
  const canClickWhenConnected = Boolean(tDisconnect)
  const disabled = loading || (connected && !canClickWhenConnected)

  return (
    <div className='flex gap-3'>
      <div
        className={cn(
          'size-11 shrink-0 bg-[#111111]',
          'border border-white/5 rounded-xl',
          'flex items-center justify-center',
        )}
      >
        <img src={icon} alt='icon platform' className='size-5.5' />
      </div>

      <div className='flex-1 flex flex-col gap-3'>
        <InfoBlock
          title={title}
          paragraph={subtitle}
          paragraphClass='text-sm/5 tracking-wide'
          className='gap-1'
        />

        <Button
          size='md'
          variant='secondary'
          className={cn(buttonClassName, 'rounded-xl h-10')}
          disabled={disabled}
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
