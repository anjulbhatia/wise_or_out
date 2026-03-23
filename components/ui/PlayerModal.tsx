'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import { Modal } from './Modal'
import { Category } from '@/lib/types'

interface PlayerModalProps {
  open: boolean
  onClose: () => void
  onStart: (name: string, age?: number) => void
  selectedCategory: Category
  categoryMeta: Record<Category, { icon: string; color: string; label: string }>
}

export function PlayerModal({ open, onClose, onStart, selectedCategory, categoryMeta }: PlayerModalProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [remember, setRemember] = useState(false)

  const handleStart = () => {
    const finalName = name.trim() || 'Anonymous'
    if (remember) {
      localStorage.setItem('wiseorout_player', JSON.stringify({ name: finalName }))
    } else {
      localStorage.removeItem('wiseorout_player')
    }
    onStart(finalName, age ? parseInt(age) : undefined)
    setName('')
    setAge('')
    setRemember(false)
  }

  const handleSkip = () => {
    setName('Anonymous')
    handleStart()
  }

  const meta = categoryMeta[selectedCategory]

  return (
    <Modal open={open} onClose={onClose} className='px-4 py-2'>
      <h2 className="text-white text-base font-semibold mb-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        Who takes the seat?
      </h2>
      <p className="text-muted-foreground text-[10px] mb-3">
        Arena: <span style={{ color: meta.color }}>{meta.label}</span>
      </p>
      
      <div className="flex gap-2 mb-3">
        <div className="flex-1">
          <label className="text-muted-foreground text-[9px] uppercase tracking-widest mb-1 block">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            maxLength={20}
            className="w-full bg-background border text-white px-2 py-1.5 text-xs focus:outline-none"
            style={{ borderColor: 'hsl(0, 0%, 12%)' }}
            autoFocus
          />
        </div>
        <div className="w-14">
          <label className="text-muted-foreground text-[9px] uppercase tracking-widest mb-1 block">Age</label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="--"
            min={5} max={99}
            className="w-full bg-background border text-white px-1 py-1.5 text-xs focus:outline-none text-center"
            style={{ borderColor: 'hsl(0, 0%, 12%)' }}
          />
        </div>
      </div>

      <label className="flex items-center gap-1.5 cursor-pointer mb-3">
        <div 
          className={`w-3 h-3 border flex items-center justify-center cursor-pointer ${remember ? 'border-primary bg-primary' : 'border-muted-foreground/40'}`}
          style={{ borderColor: remember ? 'hsl(0, 0%, 85%)' : 'hsl(0, 0%, 40%)' }}
          onClick={() => setRemember(!remember)}
        >
          {remember && <svg width="6" height="4" viewBox="0 0 6 4"><path d="M1 2L2.5 3.5L5 1" stroke="hsl(0, 0%, 3.1%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
        </div>
        <span className="text-muted-foreground text-[10px]">Remember me</span>
      </label>

      <div className="flex gap-2">
        <motion.button
          onClick={handleStart}
          className="flex-1 py-1.5 text-[10px] font-medium uppercase tracking-widest action-button"
          whileTap={{ scale: 0.98 }}
        >
          Play
        </motion.button>
        <motion.button
          onClick={handleSkip}
          className="px-3 py-1.5 text-[10px] text-muted-foreground hover:text-foreground border"
          style={{ borderColor: 'hsl(0, 0%, 12%)' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Skip
        </motion.button>
      </div>
    </Modal>
  )
}
