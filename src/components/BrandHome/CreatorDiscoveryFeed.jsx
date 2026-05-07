'use client'

import { useState } from 'react'
import CreatorCard from './CreatorCard'
import { BRAND_HOME_CREATORS } from '@/constants/brandHomeData'

const FILTERS = ['All creators', 'Fitness', 'Lifestyle', 'Fashion', '100K+', 'Top match']

function applyFilter(creators, filter) {
  if (filter === 'All creators') return creators
  if (filter === '100K+') return creators.filter((c) => parseInt(c.followers) >= 100)
  if (filter === 'Top match') return creators.filter((c) => parseInt(c.match) >= 90)
  return creators.filter((c) => c.category === filter)
}

export default function CreatorDiscoveryFeed() {
  const [activeFilter, setActiveFilter] = useState('All creators')
  const creators = applyFilter(BRAND_HOME_CREATORS, activeFilter)

  return (
    <div className="flex flex-col gap-3.5">
      {/* Filter bar */}
      <div className="flex items-center flex-wrap gap-2 bg-white border border-(--border) rounded-full px-4 py-1.5">
        <span className="text-[12.5px] text-(--ink3) mr-1">Discover:</span>
        {FILTERS.map((f) => {
          const isSep = f === '100K+'
          return (
            <div key={f} className="flex items-center gap-2">
              {isSep && <div className="w-px h-4 bg-(--border) shrink-0" />}
              <button
                onClick={() => setActiveFilter(f)}
                className={[
                  'text-[12.5px] px-3.5 py-1.25 rounded-full border cursor-pointer transition-all duration-150 whitespace-nowrap font-sans',
                  activeFilter === f
                    ? 'border-(--ink) bg-(--ink) text-white'
                    : 'border-(--border) bg-transparent text-(--ink2) hover:border-(--border2)',
                ].join(' ')}
              >
                {f}
              </button>
            </div>
          )
        })}
      </div>

      {/* Creator cards */}
      {creators.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}

      {creators.length === 0 && (
        <div className="flex items-center justify-center bg-white border border-(--border) rounded-2xl py-10 text-[13.5px] text-(--ink4)">
          No creators match this filter.
        </div>
      )}
    </div>
  )
}
