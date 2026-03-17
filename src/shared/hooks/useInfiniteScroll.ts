'use client'

import { useEffect, useRef } from 'react'

interface UseInfiniteScrollProps {
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
  threshold?: number
}

export const useInfiniteScroll = ({
  hasMore,
  loading,
  onLoadMore,
  threshold = 100,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (loading) return
    if (!hasMore) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore()
        }
      },
      { threshold: 0.1, rootMargin: `${threshold}px` },
    )

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [hasMore, loading, onLoadMore, threshold])

  return lastElementRef
}
