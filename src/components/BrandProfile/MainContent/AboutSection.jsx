'use client'

import { Instagram, Youtube, Link as LinkIcon, Plus, Pencil } from 'lucide-react'

const SOCIAL_ICONS = { Instagram, Youtube, Link: LinkIcon }

export default function AboutSection({ bio, socials = [], mode = 'user' }) {
  const isOwn = mode === 'own'

  return (
    <section
      className="bg-white overflow-hidden"
      style={{ border: '1px solid var(--border)', borderRadius: 18 }}
    >
      <header
        className="flex items-center justify-between"
        style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}
      >
        <div
          className="flex items-center"
          style={{
            gap: 8,
            fontFamily: 'var(--serif)',
            fontSize: 20,
            fontWeight: 400,
            color: 'var(--ink)',
          }}
        >
          <span style={{ width: 16, height: 2, background: 'var(--blue)', borderRadius: 2 }} />
          {isOwn ? 'About Our Brand' : 'About the Brand'}
        </div>
        {isOwn && (
          <button
            type="button"
            className="inline-flex items-center transition-colors hover:bg-[var(--bg-muted)]"
            style={{
              gap: 5,
              fontSize: 11,
              padding: '4px 11px',
              borderRadius: 100,
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--ink3)',
              cursor: 'pointer',
            }}
          >
            <Pencil size={11} />
            Edit bio
          </button>
        )}
      </header>

      <div style={{ padding: 20 }}>
        <p
          className={isOwn ? 'cursor-pointer hover:!border-[var(--border2)]' : ''}
          style={{
            fontSize: 13.5,
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'var(--ink2)',
            whiteSpace: 'pre-line',
            padding: 14,
            background: 'var(--surface)',
            borderRadius: 10,
            border: '1px solid var(--border)',
            marginBottom: 16,
            transition: 'border-color 0.18s',
          }}
        >
          {bio}
        </p>

        <div
          style={{
            fontSize: 10.5,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink4)',
            marginBottom: 10,
          }}
        >
          Connect with us
        </div>
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          {socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon]
            return (
              <a
                key={social.platform}
                href={social.url}
                className="inline-flex items-center transition-colors hover:!border-[var(--border2)] hover:!bg-[var(--bg-muted)]"
                style={{
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--ink2)',
                  padding: '6px 14px',
                  borderRadius: 100,
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  textDecoration: 'none',
                }}
              >
                {Icon && <Icon size={13} style={{ opacity: 0.6 }} />}
                {social.label}
              </a>
            )
          })}
          {isOwn && (
            <button
              type="button"
              className="inline-flex items-center transition-colors hover:!border-[var(--blue)] hover:!text-[var(--blue)]"
              style={{
                gap: 5,
                fontSize: 12,
                fontWeight: 500,
                padding: '6px 14px',
                borderRadius: 100,
                border: '1px dashed var(--border2)',
                background: 'transparent',
                color: 'var(--ink4)',
                cursor: 'pointer',
              }}
            >
              <Plus size={11} />
              Add link
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
