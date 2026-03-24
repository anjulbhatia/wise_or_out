'use client'
import { useEffect, useState } from 'react'
import { useGame } from '@/hooks/game-context'
import { LeaderboardEntry, Category, CATEGORY_LABELS, formatPrize } from '@/lib/types'
import { X } from 'lucide-react'

const RANK_COLORS = ['#D4AF37', '#C0C0C0', '#CD7F32']
const RANK_LABELS = ['1st', '2nd', '3rd']

interface LeaderboardModalProps {
  open: boolean
  onClose: () => void
}

export function LeaderboardModal({ open, onClose }: LeaderboardModalProps) {
  const { state, resetGame } = useGame()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [loading, setLoading] = useState(true)

  const categories: (Category | 'all')[] = ['all', 'ai', 'entertainment', 'sports', 'world', 'surprise']

  useEffect(() => {
    if (open) {
      fetch('/api/leaderboard')
        .then(r => r.json())
        .then(data => { setEntries(data.entries || []); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [open])

  const filtered = filter === 'all'
    ? entries
    : entries.filter(e => e.category === filter)

  const sorted = [...filtered].sort((a, b) => b.score - a.score).slice(0, 50)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80" 
        onClick={onClose}
      />
      
      <div 
        className="relative w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
        style={{ 
          backgroundColor: 'hsl(0, 0%, 3%)',
          border: '1px solid hsl(0, 0%, 12%)',
          borderRadius: '8px'
        }}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'hsl(0, 0%, 12%)' }}>
          <h2 className="text-white text-lg font-semibold">Hall of the Wise</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 flex-wrap p-3 border-b" style={{ borderColor: 'hsl(0, 0%, 12%)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-3 py-1 text-xs uppercase tracking-widest transition-all rounded-sm"
              style={{
                background: filter === cat ? 'hsla(45, 80%, 50%, 0.15)' : 'hsl(0, 0%, 8%)',
                border: `1px solid ${filter === cat ? 'hsl(45, 80%, 50%)' : 'hsl(0, 0%, 15%)'}`,
                color: filter === cat ? 'hsl(45, 80%, 50%)' : 'hsl(0, 0%, 50%)',
              }}
            >
              {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground text-sm">Loading...</div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm mb-4">No scores yet. Be the first!</p>
              <button
                onClick={() => { onClose(); resetGame(); }}
                className="px-6 py-2 text-sm font-semibold tracking-widest uppercase"
                style={{ 
                  background: 'hsl(45, 80%, 50%)', 
                  color: 'hsl(0, 0%, 5%)',
                  borderRadius: '4px'
                }}
              >
                Play Now
              </button>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'hsl(0, 0%, 10%)' }}>
              {sorted.map((entry, i) => (
                <LeaderboardRow
                  key={i}
                  rank={i + 1}
                  entry={entry}
                  isYou={entry.name === state.playerName}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LeaderboardRow({
  rank, entry, isYou
}: {
  rank: number
  entry: LeaderboardEntry
  isYou: boolean
}) {
  const isTop3 = rank <= 3
  const rankColor = isTop3 ? RANK_COLORS[rank - 1] : 'hsl(0, 0%, 50%)'

  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{
        background: isYou ? 'hsla(45, 80%, 50%, 0.07)' : 'transparent',
      }}
    >
      <div
        className="w-6 text-xs font-bold text-center flex-shrink-0"
        style={{ color: rankColor }}
      >
        {isTop3 ? RANK_LABELS[rank - 1] : rank}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-sm truncate"
            style={{ color: isYou ? 'hsl(45, 80%, 50%)' : 'hsl(0, 0%, 80%)' }}
          >
            {entry.name}
          </span>
          {isYou && (
            <span
              className="text-[9px] px-1.5 py-0.5 rounded"
              style={{ background: 'hsla(45, 80%, 50%, 0.2)', color: 'hsl(45, 80%, 50%)' }}
            >
              you
            </span>
          )}
        </div>
        <div className="text-muted-foreground text-xs capitalize mt-0.5">
          {CATEGORY_LABELS[entry.category]} · {entry.questionsCorrect}/10
        </div>
      </div>

      <div
        className="text-sm font-semibold flex-shrink-0"
        style={{ color: isTop3 ? rankColor : 'hsl(0, 0%, 60%)' }}
      >
        {formatPrize(entry.score)}
      </div>
    </div>
  )
}
