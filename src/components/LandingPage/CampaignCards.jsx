'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const campaigns = [
  {
    id: 'gymshark',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop&crop=top',
    brand: 'Gymshark India',
    category: 'Fitness & Apparel',
    avatar: 'G',
    avatarBg: 'linear-gradient(135deg,#0f0f0f,#3a3a3a)',
    title: 'Summer Drop 2025 — Fitness Reel Series',
    desc: 'Looking for fitness creators in Mumbai/Pune to authentically showcase our Summer Drop collection through 3 high-energy Reels.',
    payment: '₹54K',
    paymentLabel: 'For 3 posts',
    spots: '4',
    deadline: 'Apr 15'
  },
  {
    id: 'mama',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80&fit=crop&crop=top',
    brand: 'MamaEarth',
    category: 'Natural Skincare',
    avatar: 'M',
    avatarBg: 'linear-gradient(135deg,#1a4fd4,#0d32a0)',
    title: 'Vitamin C Glow — 30-Day Creator Journey',
    desc: 'We want real creators to document a 30-day skin transformation with our new Vitamin C range. No scripts, just real results.',
    payment: '₹28K',
    paymentLabel: 'Per creator',
    spots: '20',
    deadline: 'Apr 30'
  },
  {
    id: 'zomato',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fit=crop&crop=center',
    brand: 'Zomato',
    category: 'Food & Discovery',
    avatar: 'Z',
    avatarBg: 'linear-gradient(135deg,#1a7a45,#0d4a28)',
    title: 'Food Diaries — City Hidden Gems Series',
    desc: 'Partner with Zomato to explore the best hidden food spots in your city. 5 Reels and Stories across 3 weeks.',
    payment: '₹40K',
    paymentLabel: 'For 5 posts',
    spots: '15',
    deadline: 'May 10'
  }
]

export default function CampaignCards() {
  return (
    <section
      className="py-14 px-5 sm:px-10 lg:py-24 lg:px-20"
      style={{ background: '#f7f4ef' }}
    >
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
            <span style={{ color: '#d43a2a' }}>Live Campaigns</span>
          </div>
          <h2
            className="leading-tight"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(42px, 5.5vw, 80px)',
              letterSpacing: '0.02em',
              color: '#0a0a0a'
            }}
          >
            OPEN COLLABS<br />RIGHT <span style={{ color: '#d43a2a' }}>NOW</span>
          </h2>
        </div>
        <a
          href="#"
          className="flex items-center gap-1.5 whitespace-nowrap"
          style={{ fontSize: '13px', fontWeight: 500, color: '#6a6a6a' }}
        >
          See all campaigns →
        </a>
      </motion.div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map((campaign, i) => (
          <motion.div
            key={campaign.id}
            className="bg-white rounded-3xl overflow-hidden border cursor-pointer group transition-all hover:shadow-lg"
            style={{ borderColor: 'rgba(10, 10, 10, 0.1)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            {/* Image section */}
            <div className="relative overflow-hidden" style={{ height: '200px' }}>
              <Image
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: 'center top' }}
                fill
              />
              <div
                className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{ background: '#1a7a45', color: 'white', letterSpacing: '0.1em', zIndex: 2 }}
              >
                Open
              </div>
            </div>

            {/* Content section */}
            <div style={{ padding: '20px' }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="rounded-lg flex items-center justify-center text-sm font-semibold text-white shrink-0"
                  style={{ background: campaign.avatarBg, width: '34px', height: '34px' }}
                >
                  {campaign.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#0a0a0a' }}>{campaign.brand}</div>
                  <div style={{ fontSize: '11px', color: '#6a6a6a' }}>{campaign.category}</div>
                </div>
              </div>

              <div className="mb-2" style={{ fontSize: '16px', fontWeight: 500, color: '#0a0a0a', lineHeight: 1.3 }}>
                {campaign.title}
              </div>

              <div
                className="mb-4"
                style={{
                  fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: '#6a6a6a',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}
              >
                {campaign.desc}
              </div>

              <div
                className="flex gap-5"
                style={{ paddingTop: '14px', borderTop: '1px solid rgba(10, 10, 10, 0.1)' }}
              >
                {[
                  { v: campaign.payment, l: campaign.paymentLabel },
                  { v: campaign.spots, l: 'Spots left' },
                  { v: campaign.deadline, l: 'Deadline' }
                ].map(({ v, l }) => (
                  <div key={l}>
                    <div style={{ fontSize: '20px', fontWeight: 400, color: '#0a0a0a', fontFamily: "'Cormorant Garamond', serif" }}>
                      {v}
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: 400, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#6a6a6a' }}>
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
