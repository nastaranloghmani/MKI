import { useEffect, useState, useRef } from 'react'

interface DecryptedTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  characters?: string
  onComplete?: () => void
}

export const DecryptedText = ({
  text,
  className = '',
  speed = 50,
  delay = 0,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  onComplete,
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const timeout = setTimeout(() => {
      setIsAnimating(true)
      let iteration = 0
      const maxIterations = text.length

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              // Keep spaces as spaces
              if (char === ' ') return ' '

              // Characters that have been decrypted
              if (index < iteration) {
                return text[index]
              }

              // Currently decrypting character - show random
              if (index === iteration) {
                return characters[Math.floor(Math.random() * characters.length)]
              }

              // Not yet reached - show random scrambled
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join('')
        )

        iteration += 1 / 3 // Slower reveal for more dramatic effect

        if (iteration > maxIterations) {
          clearInterval(interval)
          setDisplayText(text)
          setIsAnimating(false)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay, characters, onComplete])

  return (
    <span className={`inline-block ${className}`} style={{ minWidth: `${text.length}ch` }}>
      {displayText || text}
    </span>
  )
}
