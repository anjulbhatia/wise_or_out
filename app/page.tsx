'use client'
import { useState } from 'react'
import { useGame } from '@/hooks/game-context'
import { LandingPage } from '@/components/LandingPage'
import { GameplayScreen } from '@/components/GameplayScreen'
import { ExitCard } from '@/components/ui/ExitCard'
import { LeaderboardModal } from '@/components/ui/LeaderboardModal'

function AppContent() {
  const { state, goToScreen, resetGame } = useGame()
  const [language, setLanguage] = useState<'en' | 'hi'>('en')
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
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

  return (
    <>
      <LandingPage 
        onLeaderboardClick={() => setShowLeaderboard(true)}
        onLanguageToggle={handleLanguageToggle}
        language={language}
      />
      <LeaderboardModal 
        open={showLeaderboard} 
        onClose={() => setShowLeaderboard(false)} 
      />
    </>
  )
}

export default function Home() {
  return <AppContent />
}
