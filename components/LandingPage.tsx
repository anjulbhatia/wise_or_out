'use client'
import { useState } from 'react'
import { useGame } from '@/lib/game-context'
import { Category } from '@/lib/types'
import { motion } from 'motion/react'
import { Intro } from './Intro'
import { Header } from './ui/Header'
import { Footer } from './ui/Footer'

const CATEGORIES: Category[] = ['surprise', 'ai', 'entertainment', 'sports', 'world']

const CATEGORY_META: Record<Category, { icon: string; color: string; label: string }> = {
  surprise: { icon: '✦', color: '#7C86FF', label: 'Surprise' },
  ai: { icon: '◈', color: '#4A9EFF', label: 'AI' },
  entertainment: { icon: '◉', color: '#FF6B9D', label: 'Movies' },
  sports: { icon: '◎', color: '#4CAF50', label: 'Sports' },
  world: { icon: '◇', color: '#FF9800', label: 'World' },
}

interface LandingPageProps {
  onLeaderboardClick: () => void
  onLanguageToggle: () => void
  onReplayIntro: () => void
  language: 'en' | 'hi'
  replayTrigger: number
}

export function LandingPage({ onLeaderboardClick, onLanguageToggle, onReplayIntro, language, replayTrigger }: LandingPageProps) {
  const { startGame, state } = useGame()
  const [selectedCategory, setSelectedCategory] = useState<Category>('surprise')
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null)

  const handleStart = () => {
    startGame('Anonymous', undefined, selectedCategory)
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: 'hsl(0, 0%, 3.1%)' }}>
      <Header 
        onLeaderboardClick={onLeaderboardClick}
        onLanguageToggle={onLanguageToggle}
        onReplayIntro={onReplayIntro}
        language={language}
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
        <motion.div
          className="w-full max-w-sm mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Intro 
            replayTrigger={replayTrigger} 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <motion.button
            onClick={handleStart}
            className="action-button text-xs py-3 px-8 cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            Take the Seat
          </motion.button>
        </motion.div>

        <motion.div
          className="grid grid-cols-5 gap-1.5 w-full max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              onMouseEnter={() => setHoveredCategory(cat)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="p-2 text-center border transition-all cursor-pointer"
              style={{ 
                backgroundColor: selectedCategory === cat ? 'hsla(239, 84%, 67%, 0.1)' : hoveredCategory === cat ? 'hsla(239, 84%, 67%, 0.05)' : 'hsl(0, 0%, 4%)',
                borderColor: selectedCategory === cat ? 'hsl(239, 84%, 67%)' : hoveredCategory === cat ? 'hsl(239, 84%, 67%)' : 'hsl(0, 0%, 12%)' 
              }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg block" style={{ color: CATEGORY_META[cat].color }}>
                {CATEGORY_META[cat].icon}
              </span>
              <span className="text-[9px] text-white block mt-1">
                {CATEGORY_META[cat].label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
