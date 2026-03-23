'use client'
import { useState } from 'react'
import { useGame } from '@/lib/game-context'
import { LandingPage } from '@/components/LandingPage'
import { GameplayScreen } from '@/components/GameplayScreen'
import { ExitCard } from '@/components/ui/ExitCard'
import { LeaderboardScreen } from '@/components/LeaderboardScreen'

function AppContent() {
  const { state, goToScreen, resetGame } = useGame()
  const [language, setLanguage] = useState<'en' | 'hi'>('en')
  const [replayTrigger, setReplayTrigger] = useState(0)

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  const handleReplayIntro = () => {
    setReplayTrigger(prev => prev + 1)
  }

  const handlePlayAgain = () => {
    resetGame()
  }

  const handleGoHome = () => {
    goToScreen('landing')
  }

  if (state.screen === 'game') {
    return <GameplayScreen />
  }

  if (state.screen === 'gameover' || state.screen === 'victory') {
    return (
      <ExitCard 
        type={state.screen} 
        onPlayAgain={handlePlayAgain}
        onGoHome={handleGoHome}
      />
    )
  }

  if (state.screen === 'leaderboard') {
    return <LeaderboardScreen />
  }

  return (
    <LandingPage 
      onLeaderboardClick={() => goToScreen('leaderboard')}
      onLanguageToggle={handleLanguageToggle}
      onReplayIntro={handleReplayIntro}
      language={language}
      replayTrigger={replayTrigger}
    />
  )
}

export default function Home() {
  return <AppContent />
}
