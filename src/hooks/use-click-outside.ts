import { useEffect, useRef, useState } from "react"

export default function useClickOutside(callback: EventListener) {
  const container = useRef<any>(null)
  const [isTouchEvent, setTouchEvent] = useState(false)
  const eventType = isTouchEvent ? "touchend" : "click"

  function handleEvent(e: Event) {
    if (e.type === "click" && isTouchEvent) {
      return
    }
    // Do nothing if clicking ref's element or descendent elements and modals open
    const modal = document.querySelector(".p-dialog-mask")
    const datepicker = document.querySelector(".rc-calendar-picker")

    if (container.current && e.target !== null && !modal && !datepicker) {
      if (!container.current.contains(e.target as Node)) {
        callback(e)
      }
    }
  }

  useEffect(() => {
    document.addEventListener(eventType, handleEvent, true)

    return () => {
      document.removeEventListener(eventType, handleEvent, true)
    }
  }, [eventType, handleEvent])

  useEffect(() => {
    setTouchEvent("ontouchstart" in document.documentElement)
  }, [])

  return container
}
