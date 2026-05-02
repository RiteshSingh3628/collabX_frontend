'use client'

import { useRef, useTransition } from 'react'
import { Camera } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { createFormDataPayload } from '@/lib/utils/formData'
import { updateCoverPicture } from '@/framework/server-action/creator/action'

export default function EditCoverButton({ onSuccess }) {
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef(null)

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 1 * 1024 * 1024) {
      toast.error('Image must be under 1 MB')
      e.target.value = ''
      return
    }
    const formData = createFormDataPayload({ media: file })
    e.target.value = ''
    startTransition(async () => {
      const result = await updateCoverPicture(formData)
      if (result?.success && result?.data?.coverPicture) {
        onSuccess?.(result.data.coverPicture)
        toast.success('Cover image updated')
      } else {
        toast.error(result?.message ?? 'Failed to update cover image')
      }
    })
  }

  return (
    <>
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
    </>
  )
}
