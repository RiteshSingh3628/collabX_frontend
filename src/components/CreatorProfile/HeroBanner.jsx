'use client'

import { useRef, useState, useTransition } from 'react'
import { Instagram, Youtube, Twitter, Camera } from 'lucide-react'
import { PLATFORM_TABS } from '@/constants/creatorProfileData'
import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button'
import { createFormDataPayload } from '@/lib/utils/formData'
import { updateCoverPicture } from '@/framework/server-action/creator/action'

const ICON_MAP = { Instagram, Youtube, Twitter }

export default function HeroBanner({ profile }) {
  const { user, profilePicture, coverPicture } = profile ?? {};
  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
  const [coverSrc, setCoverSrc] = useState(coverPicture ?? null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1 * 1024 * 1024) {
      toast.error('Image must be under 1 MB');
      e.target.value = '';
      return;
    }
    const formData = createFormDataPayload({ media: file });
    e.target.value = '';
    startTransition(async () => {
      const result = await updateCoverPicture(formData);
      if (result?.success && result?.data?.coverPicture) {
        setCoverSrc(result.data.coverPicture);
        toast.success('Cover image updated');
      } else {
        toast.error(result?.message ?? 'Failed to update cover image');
      }
    });
  }

  return (
    <div className="relative" style={{ marginBottom: 36 }}>
    <div
      className="relative overflow-hidden"
      style={{
        height: 220,
        background: 'linear-gradient(135deg,#0a0a0a 0%,#1c1710 40%,#2e1f0a 100%)',
      }}
    >
      {coverSrc ? (
        <>
          <Image
            src={coverSrc}
            alt="Cover"
            fill
            className="object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </>
      ) : (
        <>
          {/* Dot pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
          {/* Red glow */}
          <div
            className="absolute"
            style={{
              right: '10%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background:
                'radial-gradient(circle,rgba(212,58,42,0.2),transparent 70%)',
            }}
          />
          {/* Gold glow */}
          <div
            className="absolute"
            style={{
              left: '20%',
              top: '30%',
              width: 200,
              height: 200,
              borderRadius: '50%',
              background:
                'radial-gradient(circle,rgba(201,168,76,0.1),transparent 70%)',
            }}
          />
        </>
      )}

      {/* Platform pills top-right */}
      {/* <div
        className="absolute flex"
        style={{ top: 24, right: 32, gap: 8 }}
      >
        {PLATFORM_TABS.map((tab) => {
          const Icon = ICON_MAP[tab.icon]
          const isConnected = tab.status === 'connected'
          return (
            <div
              key={tab.id}
              className="flex items-center"
              style={{
                gap: 6,
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 100,
                padding: '5px 12px',
                fontSize: '11.5px',
                color: 'rgba(255,255,255,0.6)',
                opacity: isConnected ? 1 : 0.5,
              }}
            >
              {Icon && <Icon size={13} />}
              {tab.label} &middot; {isConnected ? 'Connected' : 'Soon'}
            </div>
          )
        })}
      </div> */}

      {/* Edit cover button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={isPending}
        className="absolute gap-1.5"
        style={{
          top: 12,
          right: 16,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 8,
          color: 'rgba(255,255,255,0.85)',
          fontSize: 12,
        }}
      >
        <Camera size={13} />
        {isPending ? 'Uploading…' : 'Edit cover'}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Name text */}
      <div className="absolute" style={{ bottom: 0, left: 150 }}>
        <div
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 32,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.02em',

          }}
        >
          {fullName}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.04em',
          }}
        >
          {profile?.handle} &middot; {profile?.role}
        </div>
      </div>
    </div>

      {/* Avatar - outside overflow-hidden banner so it's fully visible */}
      <div
        className="absolute"
        style={{ bottom: -36, left: 28, width: 90, height: 90, zIndex: 2 }}
      >
        <div
          className="overflow-hidden"
          style={{
            width: 90,
            height: 90,
            borderRadius: 22,
            border: '4px solid #fff',
            boxShadow: '0 12px 48px rgba(0,0,0,0.11)',
            background: 'linear-gradient(135deg,#d43a2a,#8a1a10)',
          }}
        >
          <div
            className="relative w-full h-full flex items-center overflow-hidden justify-center"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 36,
              fontWeight: 300,
              color: '#fff',
            }}
          >
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt={fullName}
                fill
              />
            ) : (
              fullName.charAt(0).toUpperCase()
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
