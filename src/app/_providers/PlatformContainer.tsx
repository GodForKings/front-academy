'use client'

import type { FC, ReactNode } from 'react'

import { cn, usePlatform } from '@/shared'
import { Dialog, Modal } from '@/widgets'

interface PlatformContainerProps {
	children: ReactNode
	className?: string
}
export const PlatformContainer: FC<PlatformContainerProps> = props => {
	const { children, className } = props
	const { isMobile } = usePlatform()

	return (
		<>
			<div
				className={cn(
					'relative mx-auto w-full',
					!isMobile && 'max-w-112.5',
					className,
				)}
			>
				{children}
			</div>
			{/* Глобальная modal */}
			<Modal />
			{/* Глобальный dialog */}
			<Dialog />
		</>
	)
}
