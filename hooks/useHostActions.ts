'use client'
import { useCallback, useRef } from 'react'

export interface HostActions {
  onChooseOption: (option: string) => void
  onChooseLifeline: (lifeline: '5050' | 'swap' | 'skip' | 'expert') => void
  onRepeatQuestion: () => void
  onRepeatOptions: () => void
  onQuit: () => void
  onGetExplanation: () => void
  onPauseGame: () => void
  onResumeGame: () => void
  onReadyForNextQuestion: () => void
}

export function useHostActions(actions: HostActions) {
  const actionsRef = useRef(actions)
  
  const clientTools = {
    ready_to_play: {
      description: 'When contestant confirms they are ready to start the game',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onReadyForNextQuestion()
        return 'Game started'
      }
    },
    
    choose_option: {
      description: 'When contestant chooses an answer option A, B, C, or D',
      parameters: {
        type: 'object',
        properties: {
          option: { type: 'string', enum: ['A', 'B', 'C', 'D'] }
        },
        required: ['option']
      },
      handler: async ({ option }: { option: string }) => {
        actionsRef.current.onChooseOption(option)
        return `Option ${option} selected`
      }
    },
    
    use_fifty_fifty: {
      description: 'When contestant asks for 50:50 lifeline',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onChooseLifeline('5050')
        return 'fifty_fifty_activated'
      }
    },
    
    use_swap: {
      description: 'When contestant asks to swap the question',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onChooseLifeline('swap')
        return 'swap_activated'
      }
    },
    
    use_skip: {
      description: 'When contestant asks to skip the question',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onChooseLifeline('skip')
        return 'skip_activated'
      }
    },

    use_expert: {
      description: 'When contestant asks to ask an expert (Firecrawl search)',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onChooseLifeline('expert')
        return 'expert_activated'
      }
    },
    
    repeat_question: {
      description: 'When contestant asks to repeat the question',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onRepeatQuestion()
        return 'repeating_question'
      }
    },
    
    repeat_options: {
      description: 'When contestant asks to repeat all options',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onRepeatOptions()
        return 'repeating_options'
      }
    },
    
    ask_explanation: {
      description: 'When contestant asks for explanation of the answer',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onGetExplanation()
        return 'explanation_requested'
      }
    },
    
    quit_game: {
      description: 'When contestant decides to walk away with their winnings',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onQuit()
        return 'game_quit'
      }
    },
    
    pause_game: {
      description: 'When contestant and host are talking at checkpoint',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onPauseGame()
        return 'game_paused'
      }
    },
    
    resume_game: {
      description: 'When contestant is ready to continue after checkpoint',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onResumeGame()
        return 'game_resumed'
      }
    },
    
    next_question: {
      description: 'When contestant is ready for next question',
      parameters: { type: 'object', properties: {}, required: [] },
      handler: async () => {
        actionsRef.current.onReadyForNextQuestion()
        return 'ready_for_next'
      }
    }
  }

  return { clientTools, actionsRef }
}
