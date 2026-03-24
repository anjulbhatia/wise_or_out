'use client'
import { useState, useCallback, useRef, useEffect } from 'react'
import { useConversation } from '@elevenlabs/react'
import type { Question } from '@/lib/types'
import { PRIZE_LADDER, CHECKPOINTS, formatPrize } from '@/lib/types'
import { HostActions } from './useHostActions'

export type AppPhase = 'intro' | 'playing' | 'checkpoint' | 'gameover' | 'victory'
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

export interface UseAppConversationReturn {
  phase: AppPhase
  status: ConnectionStatus
  isConnected: boolean
  isSpeaking: boolean
  isListening: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  startGame: (playerName: string, category?: string) => void
  sendQuestion: (question: Question, index: number, securedScore: number) => void
  sendAnswer: (option: string, correct: boolean) => void
  sendCheckpoint: (playerName: string, index: number, score: number) => void
  sendGameOver: (playerName: string, score: number, correct: number) => void
  sendVictory: (playerName: string) => void
}

export function useAppConversation(hostActions: HostActions): UseAppConversationReturn {
  const [phase, setPhase] = useState<AppPhase>('intro')
  const [status, setStatus] = useState<ConnectionStatus>('disconnected')
  const playerNameRef = useRef<string>('Contestant')
  const categoryRef = useRef<string>('')
  
  const phaseRef = useRef(phase)
  const hostActionsRef = useRef(hostActions)
  
  useEffect(() => {
    phaseRef.current = phase
  }, [phase])
  
  useEffect(() => {
    hostActionsRef.current = hostActions
  }, [hostActions])

  const conversation = useConversation({
    onConnect: () => {
      console.log('[App] Connected to ElevenLabs')
      setStatus('connected')
    },
    onDisconnect: () => {
      console.log('[App] Disconnected')
      setStatus('disconnected')
    },
    onError: (err) => {
      console.error('[App] Error:', err)
      setStatus('error')
    },
    onUnhandledClientToolCall: (tool) => {
      console.log('[App] Tool call:', tool.tool_name, tool.parameters)
      const currentPhase = phaseRef.current
      const actions = hostActionsRef.current
      
      if (currentPhase === 'playing' || currentPhase === 'checkpoint') {
        if (tool.tool_name === 'use_fifty_fifty') {
          actions.onChooseLifeline('5050')
        } else if (tool.tool_name === 'use_swap') {
          actions.onChooseLifeline('swap')
        } else if (tool.tool_name === 'use_skip') {
          actions.onChooseLifeline('skip')
        } else if (tool.tool_name === 'use_expert') {
          actions.onChooseLifeline('expert')
        } else if (tool.tool_name === 'choose_option') {
          const params = tool.parameters as { option: string }
          actions.onChooseOption(params.option)
        } else if (tool.tool_name === 'repeat_question') {
          actions.onRepeatQuestion()
        } else if (tool.tool_name === 'repeat_options') {
          actions.onRepeatOptions()
        } else if (tool.tool_name === 'quit_game') {
          actions.onQuit()
        } else if (tool.tool_name === 'ask_explanation') {
          actions.onGetExplanation()
        } else if (tool.tool_name === 'pause_game') {
          actions.onPauseGame()
        } else if (tool.tool_name === 'resume_game') {
          actions.onResumeGame()
        } else if (tool.tool_name === 'next_question') {
          actions.onReadyForNextQuestion()
        }
      }
      
      if (currentPhase === 'intro' && tool.tool_name === 'ready_to_play') {
        actions.onReadyForNextQuestion()
      }
    }
  })

  const connect = useCallback(async () => {
    const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID
    
    if (!apiKey || !agentId) {
      console.warn('[App] Missing API key or agent ID')
      return
    }
    
    setStatus('connecting')
    
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      
      console.log('[App] Starting session with agent:', agentId)
      
      await conversation.startSession({
        agentId,
        connectionType: 'webrtc',
      })
      
      console.log('[App] Session started successfully')
    } catch (err) {
      console.error('[App] Failed to start:', (err as Error)?.message || err)
      setStatus('error')
    }
  }, [conversation])

  const disconnect = useCallback(async () => {
    try {
      await conversation.endSession()
    } catch (err) {
      console.error('[App] Failed to end:', err)
    }
  }, [conversation])

  const startGame = useCallback((playerName: string, category?: string) => {
    playerNameRef.current = playerName
    categoryRef.current = category || ''
    
    if (conversation.status !== 'connected') {
      console.log('[App] Not connected')
      return
    }
    
    setPhase('playing')
    
    const introMsg = `INTRO: Contestant "${playerName}" is ready to play. Category: ${categoryRef.current || 'Surprise Me'}`
    conversation.sendUserMessage(introMsg)
  }, [conversation])

  const sendQuestion = useCallback((q: Question, idx: number, secured: number) => {
    setPhase('playing')
    const prize = formatPrize(PRIZE_LADDER[idx])
    const isCheckpoint = CHECKPOINTS.includes(idx)
    const difficulty = idx < 3 ? 'Easy' : idx < 7 ? 'Medium' : 'Hard'
    
    if (conversation.status === 'connected') {
      const context = `QUESTION ${idx + 1}/10 | Prize: ${prize} | Secured: ${formatPrize(secured)} | Difficulty: ${difficulty}${isCheckpoint ? ' | CHECKPOINT' : ''} | Q: ${q.question} | A: ${q.options[0]} | B: ${q.options[1]} | C: ${q.options[2]} | D: ${q.options[3]}`
      conversation.sendUserMessage(context)
    }
  }, [conversation])

  const sendAnswer = useCallback((option: string, correct: boolean) => {
    if (conversation.status === 'connected') {
      const resultMsg = correct 
        ? `ANSWER: ${option} - CORRECT!` 
        : `ANSWER: ${option} - WRONG!`
      conversation.sendUserMessage(resultMsg)
    }
    
    setPhase(correct ? 'playing' : 'gameover')
  }, [conversation])

  const sendCheckpoint = useCallback((name: string, idx: number, score: number) => {
    setPhase('checkpoint')
    
    if (conversation.status === 'connected') {
      const checkpointMsg = `CHECKPOINT: ${name} reached Q${idx + 1} and secured ${formatPrize(score)}`
      conversation.sendUserMessage(checkpointMsg)
    }
  }, [conversation])

  const sendGameOver = useCallback((name: string, score: number, correct: number) => {
    setPhase('gameover')
    
    if (conversation.status === 'connected') {
      const gameOverMsg = `GAME OVER: ${name} got ${correct}/10, takes home ${formatPrize(score)}`
      conversation.sendUserMessage(gameOverMsg)
    }
  }, [conversation])

  const sendVictory = useCallback((name: string) => {
    setPhase('victory')
    
    if (conversation.status === 'connected') {
      const victoryMsg = `VICTORY: ${name} won ₹1,000,000!`
      conversation.sendUserMessage(victoryMsg)
    }
  }, [conversation])

  return {
    phase,
    status,
    isConnected: conversation.status === 'connected',
    isSpeaking: conversation.isSpeaking,
    isListening: conversation.status === 'connected',
    connect,
    disconnect,
    startGame,
    sendQuestion,
    sendAnswer,
    sendCheckpoint,
    sendGameOver,
    sendVictory
  }
}
