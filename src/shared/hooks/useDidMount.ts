'use client'

import { useEffect, useState } from 'react'

/** @return `true` if component was mounted.*/
export function useDidMount(): boolean {
  const [didMount, setDidMount] = useState<boolean>(false)
   
  useEffect(() => {
    setDidMount(true)
  }, [])

  return didMount
}
