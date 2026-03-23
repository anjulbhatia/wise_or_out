'use client'
import { Trophy } from 'lucide-react'

interface HeaderProps {
  onLeaderboardClick: () => void
  onLanguageToggle: () => void
  onReplayIntro: () => void
  language: 'en' | 'hi'
}

export function Header({ onLeaderboardClick, onLanguageToggle, onReplayIntro, language }: HeaderProps) {
  return (
    <>
      <button
        onClick={onReplayIntro}
        className="hidden absolute top-3 left-3 w-7 h-7 flex items-center justify-center border text-xs font-mono transition-colors hover:text-foreground"
        style={{ borderColor: 'hsl(0, 0%, 40%)', color: 'hsl(0, 0%, 60%)' }}
        title="Replay Intro"
      >
        ?
      </button>
      
      <div className="absolute top-0 right-0 flex justify-end items-center gap-3 px-4 py-3 z-10">
        <button
          onClick={onLeaderboardClick}
          className="text-xs font-mono text-muted-foreground hover:text-amber-500 transition-colors uppercase tracking-widest flex items-center gap-1"
        >
          <Trophy className="w-3 h-3" />
          Leaderboard
        </button>
      <button
        onClick={onLanguageToggle}
        className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors uppercase px-2 py-1 border"
        style={{ borderColor: 'hsl(0, 0%, 40%)' }}
      >
        {language === 'en' ? 'EN' : 'HI'}
      </button>
      </div>
    </>
  )
}
