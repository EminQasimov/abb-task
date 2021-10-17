import { MutableRefObject, useEffect, useRef } from 'react'

type EventType = MouseEvent | TouchEvent

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>

type TargetElement = HTMLElement | Element | Document | Window

export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement
  }

  let targetElement: TargetElement | undefined | null

  if (typeof target === 'function') {
    targetElement = target()
  } else if ('current' in target) {
    targetElement = target.current
  } else {
    targetElement = target
  }

  return targetElement
}

export default function useClickOutside(
  onClickAway: (event: EventType) => void
) {
  const targetRef = useRef(null)

  const onClickAwayRef = useRef(onClickAway)
  onClickAwayRef.current = onClickAway

  useEffect(() => {
    const handler = (event: EventType) => {
      const targetElement = getTargetElement(targetRef) as HTMLElement
      const modal = document.querySelector('.p-dialog-mask')
      const datepicker = document.querySelector('.rc-calendar-picker')

      if (
        !targetElement ||
        targetElement?.contains(event.target as Node) ||
        modal ||
        datepicker
      ) {
        return
      }

      onClickAwayRef.current(event)
    }

    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])

  return targetRef
}
