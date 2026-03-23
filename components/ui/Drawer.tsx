'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  size?: 'fit' | 'full'
  pos?: 'left' | 'right'
  className?: string
  showBackdrop?: boolean
}

export function Drawer({ open, onClose, children, size = 'fit', pos = 'right', className = '', showBackdrop = false }: DrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const widthClass = size === 'full' ? 'w-full max-w-md' : 'w-64'
  const slideFrom = pos === 'right' ? { x: '100%' } : { x: '-100%' }
  const isLeft = pos === 'left'

  return (
    <AnimatePresence>
      {open && (
        <>
          {showBackdrop && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}
          <motion.div
            ref={containerRef}
            className={`fixed z-50 top-0 bottom-0 flex ${isLeft ? 'left-0' : 'right-0'} ${widthClass} border-l border-r ${className}`}
            style={{
              backgroundColor: 'hsl(0, 0%, 4%)',
              borderColor: 'hsl(0, 0%, 12%)',
            }}
            initial={slideFrom}
            animate={{ x: 0 }}
            exit={slideFrom}
            transition={{ type: 'spring', bounce: 0.3 }}
          >
            <button
              onClick={onClose}
              className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-12 rounded-full transition-colors hover:bg-white/10 ${isLeft ? 'left-full ml-1' : 'right-full mr-1'}`}
              style={{
                backgroundColor: 'hsl(0, 0%, 8%)',
                zIndex: isLeft ? 60 : 50,
              }}
            >
              {isLeft ? (
                <ChevronLeft className="w-3 h-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              )}
            </button>
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
