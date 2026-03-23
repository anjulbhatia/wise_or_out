'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export type OrbState = 'idle' | 'listening' | 'speaking' | 'correct' | 'wrong'

interface OrbProps {
  state?: OrbState
  size?: number
  className?: string
}

const stateColors: Record<OrbState, { glow: string; core: string; blob: string; accent: string }> = {
  idle: {
    glow: 'hsla(239, 84%, 67%, 0.4)',
    core: '#6366f1',
    blob: 'hsla(239, 84%, 67%, 0.6)',
    accent: 'hsla(239, 84%, 67%, 0.8)',
  },
  listening: {
    glow: 'hsla(239, 84%, 67%, 0.5)',
    core: '#818cf8',
    blob: 'hsla(239, 84%, 67%, 0.7)',
    accent: 'hsla(239, 84%, 67%, 0.9)',
  },
  speaking: {
    glow: 'hsla(258, 90%, 67%, 0.5)',
    core: '#8b5cf6',
    blob: 'hsla(258, 90%, 67%, 0.7)',
    accent: 'hsla(258, 90%, 67%, 0.9)',
  },
  correct: {
    glow: 'hsla(160, 84%, 45%, 0.5)',
    core: '#22c55e',
    blob: 'hsla(160, 84%, 45%, 0.7)',
    accent: 'hsla(160, 84%, 55%, 0.9)',
  },
  wrong: {
    glow: 'hsla(0, 72%, 45%, 0.5)',
    core: '#ef4444',
    blob: 'hsla(0, 72%, 45%, 0.7)',
    accent: 'hsla(0, 72%, 55%, 0.9)',
  },
}

export function Orb({ state = 'idle', size = 80, className = '' }: OrbProps) {
  const colors = stateColors[state]
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: -size * 0.5,
          filter: 'blur(60px)',
          background: colors.glow,
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          inset: -size * 0.25,
          filter: 'blur(30px)',
          background: colors.glow.replace('0.5', '0.25'),
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative rounded-full"
        style={{
          width: size,
          height: size,
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.blob} 0%, transparent 50%), linear-gradient(180deg, ${colors.core} 0%, ${colors.core}dd 100%)`,
            boxShadow: `
              inset 0 -30% 60% rgba(0,0,0,0.5),
              inset 0 20% 40% ${colors.blob.replace('0.7', '0.15')},
              0 0 ${isHovered ? 120 : 80}px ${colors.glow.replace('0.5', '0.3')}
            `,
          }}
        />

        <motion.div
          className="absolute rounded-full"
          style={{
            width: '60%',
            height: '60%',
            top: '10%',
            left: '10%',
            background: colors.blob,
            filter: 'blur(24px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '45%',
            height: '45%',
            top: '30%',
            left: '30%',
            background: colors.blob,
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '35%',
            height: '35%',
            top: '15%',
            left: '35%',
            background: colors.accent,
            filter: 'blur(16px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.div>

      <AnimatePresence>
        {state !== 'idle' && (
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              width: size,
              height: size,
              borderColor: colors.accent,
            }}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
