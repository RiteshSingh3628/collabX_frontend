'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Heart, MessageCircle, Video, Calendar, ExternalLink } from 'lucide-react'

function PostCard({ post, index, isSelected, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onClick={() => onSelect(index)}
      className="rounded-[14px] overflow-hidden relative cursor-pointer aspect-[9/16] group transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.02] hover:z-[2]"
      style={{ background: post.gradient }}
    >
      {/* Thumbnail placeholder - gradient bg acts as thumbnail */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Video size={24} className="text-white/30" />
      </div>

      {/* Type badge */}
      <div className="absolute top-[9px] left-[9px] flex items-center gap-1 bg-black/55 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-[3px] rounded-full">
        <Video size={10} className="text-white" />
        {post.type}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-end p-3">
        <div className="flex gap-2.5">
          <span className="flex items-center gap-1 text-xs text-white font-medium">
            <Heart size={12} className="text-white/80" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1 text-xs text-white font-medium">
            <MessageCircle size={12} className="text-white/80" />
            {post.comments}
          </span>
        </div>
        <div className="text-[11px] text-white/65 mt-[5px] line-clamp-2 leading-[1.4]">
          {post.caption}
        </div>
        <div className="text-[10px] text-white/40 mt-1">{post.date}</div>
      </div>

      {/* Selected ring */}
      {isSelected && (
        <div className="absolute inset-0 rounded-[14px] ring-2 ring-[--red] ring-offset-1 pointer-events-none" />
      )}
    </motion.div>
  )
}

function ViewAllCard({ instagramUrl, totalPosts }) {
  return (
    <motion.a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.36 }}
      className="rounded-[14px] aspect-[9/16] flex items-center justify-center cursor-pointer no-underline"
      style={{ background: 'var(--ink)' }}
    >
      <div className="text-center px-5">
        <div className="text-[28px] mb-2">&#x1F4F1;</div>
        <div className="text-[13px] font-medium text-white/70">View all on</div>
        <div className="text-sm font-semibold text-white mt-[3px]">
          Instagram &rarr;
        </div>
      </div>
    </motion.a>
  )
}

export default function RecentContent({ posts, instagramUrl }) {
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const selectedPost = selectedIdx >= 0 ? posts[selectedIdx] : null

  const handleSelect = (idx) => {
    setSelectedIdx(selectedIdx === idx ? -1 : idx)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white border border-black/8 rounded-[20px] p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-[18px]">
        <div className="flex items-center gap-2.5" style={{ fontFamily: 'var(--serif)' }}>
          <span className="w-5 h-px" style={{ background: 'var(--red)' }} />
          <span className="text-[22px] font-normal" style={{ color: 'var(--ink)' }}>
            Recent Content
          </span>
        </div>
        <span
          className="text-[10.5px] font-medium px-2.5 py-[3px] rounded-full"
          style={{ background: 'var(--cream)', color: 'var(--ink3)' }}
        >
          {posts.length} posts &middot; All Reels
        </span>
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-2 min-[560px]:grid-cols-3 gap-2.5">
        {posts.map((post, i) => (
          <PostCard
            key={post.id}
            post={post}
            index={i}
            isSelected={selectedIdx === i}
            onSelect={handleSelect}
          />
        ))}
        <ViewAllCard instagramUrl={instagramUrl} totalPosts={posts.length} />
      </div>

      {/* Expandable detail panel */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-5 bg-white border border-black/8 rounded-[20px]">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div
                  className="w-20 h-20 rounded-xl shrink-0 flex items-center justify-center"
                  style={{ background: selectedPost.gradient }}
                >
                  <Video size={20} className="text-white/40" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm leading-[1.6] mb-3" style={{ color: 'var(--ink2)' }}>
                    {selectedPost.caption}
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <span className="flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--ink3)' }}>
                      <Heart size={13} /> {selectedPost.likes} likes
                    </span>
                    <span className="flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--ink3)' }}>
                      <MessageCircle size={13} /> {selectedPost.comments} comments
                    </span>
                    <span className="flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--ink3)' }}>
                      <Calendar size={13} /> {selectedPost.date}
                    </span>
                  </div>
                </div>

                {/* Link */}
                <a
                  href={selectedPost.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[12.5px] font-medium whitespace-nowrap px-3.5 py-[7px] rounded-full border transition-all duration-200 no-underline shrink-0 hover:bg-[rgba(212,58,42,0.07)]"
                  style={{ color: 'var(--red)', borderColor: 'rgba(212,58,42,0.25)' }}
                >
                  View on Instagram <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
