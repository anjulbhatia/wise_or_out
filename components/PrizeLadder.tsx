'use client'
import { motion } from 'motion/react'
import { PRIZE_LADDER, CHECKPOINTS, formatPrize } from '@/lib/types'

interface PrizeLadderProps {
  currentPrize?: number
  currentIndex?: number
}

export function PrizeLadder({ currentPrize, currentIndex = 0 }: PrizeLadderProps) {
  return (
    <div className="flex flex-col w-full">
      <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-2">Prize Ladder</span>
      <div className="flex flex-col gap-px">
        {[...PRIZE_LADDER].reverse().map((prize, i) => {
          const idx = 9 - i
          const isCheckpoint = CHECKPOINTS.includes(idx)
          const isCurrent = currentPrize === prize
          const isCompleted = idx < currentIndex
          
          return (
            <motion.div 
              key={idx}
              className="flex items-center justify-between px-2 py-1 rounded-sm"
              style={{
                backgroundColor: isCurrent ? 'hsla(0, 0%, 8%)' : 'transparent',
              }}
            >
              <span 
                className="text-[10px] font-mono"
                style={{ 
                  color: isCurrent ? 'hsl(0, 0%, 85%)' : isCompleted ? 'hsl(0, 0%, 45%)' : isCheckpoint ? 'hsl(38, 90%, 55%)' : 'hsl(0, 0%, 35%)',
                  fontWeight: isCurrent ? 600 : 400,
                }}
              >
                Question {idx + 1}
              </span>
              <span 
                className="text-[10px] font-mono"
                style={{ 
                  color: isCurrent ? 'hsl(0, 0%, 85%)' : isCompleted ? 'hsl(0, 0%, 45%)' : isCheckpoint ? 'hsl(38, 90%, 55%)' : 'hsl(0, 0%, 35%)',
                  fontWeight: isCurrent ? 600 : 400,
                }}
              >
                {formatPrize(prize)}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
