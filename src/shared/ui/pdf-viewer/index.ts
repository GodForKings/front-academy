'use client'

import dynamic from 'next/dynamic'

export const PDFViewer = dynamic(() => import('./PDFViewer').then((module) => module.PDFViewer), {
  ssr: false,
})
