import { Ref, RefObject, useEffect } from 'react'

export const useNav = (ref: RefObject<HTMLUListElement>) => {
  const NAV_KEYS = ['ArrowUp', 'ArrowDown']

  useEffect(() => {
    let current = ref.current || null
    const handleKeys = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        if (e.key === 'ArrowUp') {
          const previousSibling = document.activeElement?.previousSibling as HTMLElement

          if (previousSibling) {
            previousSibling.focus()
          }
        } else if (e.key === 'ArrowDown') {
          const nextSibling = document.activeElement?.nextSibling as HTMLElement

          if (nextSibling) {
            nextSibling.focus()
          }
        }
      } else if (e.key === 'Enter') {
        if (document.activeElement) {
          (document.activeElement as HTMLElement).click()
        }
      }
    }

    if (current) {
      current.addEventListener('keydown', handleKeys)
    }

    return () => {
      current?.removeEventListener('keydown', handleKeys)
      current = null
    }
  }, [ref])
}
