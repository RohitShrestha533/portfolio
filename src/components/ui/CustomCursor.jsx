import { useEffect, useRef } from 'react'
import { useMousePosition } from '../../hooks/usePortfolio'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const { position } = useMousePosition()
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      posRef.current.x = lerp(posRef.current.x, position.x, 0.12)
      posRef.current.y = lerp(posRef.current.y, position.y, 0.12)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 16}px, ${posRef.current.y - 16}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${position.x - 3}px, ${position.y - 3}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [position])

  useEffect(() => {
    const handleHover = () => {
      cursorRef.current?.classList.add('scale-150', 'opacity-50')
    }
    const handleLeave = () => {
      cursorRef.current?.classList.remove('scale-150', 'opacity-50')
    }

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  })

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor w-8 h-8 border-2 border-accent-500 rounded-full transition-all duration-200 ease-out hidden md:block"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
      />
      <div
        ref={dotRef}
        className="custom-cursor w-1.5 h-1.5 bg-accent-500 rounded-full hidden md:block"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
      />
    </>
  )
}
