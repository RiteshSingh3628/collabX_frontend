'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const creators = [
  {
    id: 'priya',
    name: 'Priya Sharma',
    handle: '@priyafitlife',
    location: 'Mumbai',
    type: 'Fitness & Lifestyle',
    followers: '180K',
    engage: '6.4%',
    rate: '₹18K',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80&fit=crop&crop=top',
    tall: true
  },
  {
    id: 'rohan',
    name: 'Rohan Kapoor',
    handle: '@rohantechtalks',
    location: '320K',
    type: 'Tech & Gadgets',
    image: 'https://picsum.photos/seed/rohan-tech/600/800',
  },
  {
    id: 'anya',
    name: 'Anya Gupta',
    handle: '@anyalifestyle',
    location: '92K',
    type: 'Fashion & Style',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&fit=crop&crop=top',
  },
  {
    id: 'karan',
    name: 'Karan Mehta',
    handle: '@karanfoodstops',
    location: '210K',
    place: 'Pune',
    type: 'Food & Travel',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop&crop=center',
    wide: true
  }
]

function CreatorCard({ creator, style, className }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl cursor-pointer group ${className || ''}`}
      style={style}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <Image
        src={creator.image}
        alt={creator.name}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:brightness-50"
        style={{ filter: 'brightness(0.7)' }}
        fill
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 55%)' }}
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-end" style={{ padding: '20px' }}>
        <div
          className="inline-block mb-2 w-fit rounded-full border px-2.5 py-1 backdrop-blur-sm"
          style={{
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', background: 'rgba(255,255,255,0.15)',
            borderColor: 'rgba(255,255,255,0.2)', color: 'white'
          }}
        >
          {creator.type}
        </div>
        <div style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '2px' }}>
          {creator.name}
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>
          {creator.handle} · {creator.location}{creator.place && ` · ${creator.place}`}
        </div>
        {creator.tall && (
          <div className="flex gap-4 mt-2">
            {[{ v: creator.followers, l: 'Followers' }, { v: creator.engage, l: 'Engage' }, { v: creator.rate, l: 'Per post' }].map(({ v, l }) => (
              <div key={l}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'white', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
      >
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '0 32px' }}>
          {creator.type === 'Fitness & Lifestyle' ? 'Works with fitness, nutrition & lifestyle brands'
            : creator.type === 'Tech & Gadgets' ? 'Tech reviews & unboxings'
            : creator.type === 'Fashion & Style' ? 'Fashion, OOTDs & brand collabs'
            : 'Food diaries, restaurant reviews & travel vlogs'}
        </p>
        <button
          style={{
            fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '10px 24px', borderRadius: '100px',
            background: '#d43a2a', color: 'white', border: 'none', cursor: 'pointer'
          }}
        >
          View profile
        </button>
      </div>
    </motion.div>
  )
}

export default function CreatorSpotlight() {
  return (
    <section className="py-14 px-5 sm:px-10 lg:py-24 lg:px-20" style={{ background: '#f7f4ef' }}>
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <div
            className="flex items-center gap-2.5 mb-4"
            style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            <span style={{ width: '28px', height: '1px', background: '#d43a2a' }} />
            <span style={{ color: '#d43a2a' }}>Creator Spotlight</span>
          </div>
          <h2
            className="leading-tight"
            style={{
              fontFamily: "var(--bebas)",
              fontSize: 'clamp(42px, 5.5vw, 80px)',
              letterSpacing: '0.02em',
              color: '#0a0a0a'
            }}
          >
            VOICES THAT<br />MOVE <span style={{ color: '#d43a2a' }}>MILLIONS</span>
          </h2>
        </div>
        <a
          href="#"
          className="flex items-center gap-1.5 whitespace-nowrap"
          style={{ fontSize: '13px', fontWeight: 500, color: '#6a6a6a' }}
        >
          Browse all creators <ArrowRight size={14} />
        </a>
      </motion.div>

      {/* Mobile / Tablet: simple 2-col grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 lg:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {creators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            style={{ height: '260px' }}
          />
        ))}
      </motion.div>

      {/* Desktop: masonry-style grid */}
      <motion.div
        className="hidden lg:grid gap-3.5"
        style={{ gridTemplateColumns: '1.6fr 1fr 1fr', gridTemplateRows: 'auto auto' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {creators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            style={{
              gridColumn: creator.wide ? 'span 2' : 'span 1',
              gridRow: creator.tall ? 'span 2' : 'span 1',
              height: creator.tall ? '420px' : '200px'
            }}
          />
        ))}
      </motion.div>
    </section>
  )
}
