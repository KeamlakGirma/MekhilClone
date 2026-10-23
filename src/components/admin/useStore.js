import { useEffect, useState } from 'react'

export function useStoreValue(getter) {
  const [value, setValue] = useState(getter())
  useEffect(() => {
    const handler = () => setValue(getter())
    window.addEventListener('mekhil-store-change', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('mekhil-store-change', handler)
      window.removeEventListener('storage', handler)
    }
  }, [getter])
  return [value, setValue]
}