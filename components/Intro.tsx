"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const VOICE_SCRIPT = [
  { text: "Welcome to WiseOrOut", duration: 2500 },
  { text: "An interactive gameplay to find out if you're wise", duration: 3000 },
  { text: "Game is simple", duration: 2000 },
  { text: "10 questions", duration: 2000 },
  { text: "Each comes with 4 options", duration: 3000 },
  { text: "Only one is correct", duration: 2500 },
  { text: "Correct answers take you towards a million dollar prize", duration: 4000 },
  { text: "Wrong answers bring you down", duration: 3000 },
  { text: "Three checkpoints along the way", duration: 3000 },
  { text: "Three lifelines to help you", duration: 3000 },
  { text: "Let's see who wants to become a millionaire", duration: 3500 },
]

interface IntroProps {
  replayTrigger?: number
  onComplete?: () => void
}

export function Intro({ replayTrigger = 0, onComplete }: IntroProps) {
  const [phase, setPhase] = useState<'welcome' | 'done'>('welcome')
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    setPhase('welcome')
    setCurrentLine(0)
  }, [replayTrigger])

  useEffect(() => {
    if (phase !== 'welcome') return
    
    let totalDelay = 0
    const timeouts: NodeJS.Timeout[] = []

    VOICE_SCRIPT.forEach((line, index) => {
      const t = setTimeout(() => {
        setCurrentLine(index)
      }, totalDelay)
      timeouts.push(t)
      totalDelay += line.duration
    })

    const doneTimeout = setTimeout(() => {
      setPhase('done')
      if (onComplete) onComplete()
    }, totalDelay + 1000)
    timeouts.push(doneTimeout)

    return () => timeouts.forEach(clearTimeout)
  }, [phase, onComplete])

  const currentText = VOICE_SCRIPT[currentLine]?.text || ""

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {phase === 'welcome' ? (
          <motion.div
            key="welcome"
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <motion.div
              className="relative"
              style={{ width: 80, height: 80 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg className="absolute inset-0" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  fill="none"
                  stroke="hsl(239, 84%, 67%)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
              
              <motion.div
                className="absolute inset-2 rounded-full"
                style={{
                  background: 'hsl(239, 84%, 67%)',
                  boxShadow: '0 0 20px hsl(239, 84%, 67%, 0.5)',
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-white"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.p
              className="text-center text-sm text-muted-foreground mt-3 px-4 min-h-[3rem] flex items-center"
              key={currentLine}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {currentText}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="relative"
              style={{ width: 80, height: 80 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'hsl(239, 84%, 67%)',
                  boxShadow: '0 0 20px hsl(239, 84%, 67%, 0.5)',
                }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-white"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            <p className="text-muted-foreground text-xs mt-4">Ready to play?</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
