import { useEffect, useState, useRef, useCallback } from 'react'

// Hook for form state
export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }, [errors])

  const validate = useCallback((vals) => {
    const errs = {}
    if (!vals.name?.trim()) errs.name = 'Name is required'
    if (!vals.email?.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(vals.email)) errs.email = 'Invalid email'
    if (!vals.message?.trim()) errs.message = 'Message is required'
    else if (vals.message.trim().length < 10) errs.message = 'Message too short'
    return errs
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  return { values, errors, setErrors, isSubmitting, setIsSubmitting, handleChange, validate, reset }
}

// Hook for counting animation
export const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * (end - start) + start))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isVisible, end, start, duration])

  return { count, ref }
}
