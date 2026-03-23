'use client'
import { useEffect, useState } from 'react'
import { useGame } from '@/lib/game-context'
import { formatPrize } from '@/lib/types'
import { motion } from 'motion/react'

interface ExitCardProps {
  type: 'gameover' | 'victory'
  onPlayAgain: () => void
  onGoHome: () => void
}

export function ExitCard({ type, onPlayAgain, onGoHome }: ExitCardProps) {
  const { state } = useGame()
  const { score, securedScore, questionsCorrect, playerName } = state

  const isVictory = type === 'victory'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'hsl(0, 0%, 3.1%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-sm border p-6"
        style={{ 
          backgroundColor: 'hsl(0, 0%, 4%)', 
          borderColor: 'hsl(0, 0%, 12%)' 
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.3 }}
      >
        <div className="text-center mb-6">
          <span 
            className="text-xs tracking-widest uppercase"
            style={{ color: isVictory ? 'hsl(38, 90%, 55%)' : 'hsl(0, 72%, 45%)' }}
          >
            {isVictory ? 'Victory!' : 'Game Over'}
          </span>
        </div>

        <h2 className="text-white text-xl font-semibold text-center mb-2">
          {isVictory ? 'Congratulations!' : 'Better luck next time!'}
        </h2>
        
        <p className="text-muted-foreground text-sm text-center mb-6">
          {playerName}, {isVictory ? 'you are a millionaire!' : 'your journey ends here.'}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border p-3 text-center" style={{ borderColor: 'hsl(0, 0%, 12%)' }}>
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Score</div>
            <div className="text-lg font-mono" style={{ color: 'hsl(38, 90%, 55%)' }}>
              {formatPrize(score)}
            </div>
          </div>
          <div className="border p-3 text-center" style={{ borderColor: 'hsl(0, 0%, 12%)' }}>
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Correct</div>
            <div className="text-lg font-mono text-white">
              {questionsCorrect}/10
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-2 text-xs font-medium uppercase tracking-widest border hover:bg-white/5 transition-colors"
            style={{ borderColor: 'hsl(0, 0%, 12%)' }}
          >
            Play Again
          </button>
          <button
            onClick={onGoHome}
            className="flex-1 py-2 text-xs font-medium uppercase tracking-widest kill-button"
          >
            Home
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
