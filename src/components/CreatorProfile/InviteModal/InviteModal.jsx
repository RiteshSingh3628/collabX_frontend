'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CAMPAIGN_OPTIONS } from '@/constants/creatorProfileData'
import { toast } from 'sonner'

export default function InviteModal({ open, onOpenChange, creatorName }) {
  const [sending, setSending] = useState(false)
  const [campaign, setCampaign] = useState('')
  const [budget, setBudget] = useState('')
  const [deliverables, setDeliverables] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      onOpenChange(false)
      setCampaign('')
      setBudget('')
      setDeliverables('')
      setMessage('')
      toast.success(`Invite sent to ${creatorName}!`)
    }, 1200)
  }

  const inputClass =
    'w-full text-sm py-[11px] px-3.5 rounded-[10px] border outline-none transition-colors duration-200 focus:border-[--ink]'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-0 gap-0 border-none shadow-[0_32px_80px_rgba(0,0,0,0.2)]">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle
            className="text-[22px] font-normal"
            style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}
          >
            Invite {creatorName} to a campaign
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pt-5 pb-6 flex flex-col gap-3.5">
          {/* Campaign select */}
          <div>
            <label
              className="block text-[11px] font-medium tracking-[0.1em] uppercase mb-1.5"
              style={{ color: 'var(--ink4, #ababab)' }}
            >
              Select campaign
            </label>
            <select
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className={inputClass}
              style={{
                background: '#faf8f5',
                borderColor: 'var(--border2)',
                color: campaign ? 'var(--ink)' : 'var(--ink3)',
                fontFamily: 'var(--sans)',
              }}
            >
              <option value="">— Choose an active campaign —</option>
              {CAMPAIGN_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Budget + Deliverables row */}
          <div className="grid grid-cols-1 min-[460px]:grid-cols-2 gap-3">
            <div>
              <label
                className="block text-[11px] font-medium tracking-[0.1em] uppercase mb-1.5"
                style={{ color: 'var(--ink4, #ababab)' }}
              >
                Budget offered (&#x20B9;)
              </label>
              <input
                type="number"
                placeholder="e.g. 15000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={inputClass}
                style={{
                  background: '#faf8f5',
                  borderColor: 'var(--border2)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--sans)',
                }}
              />
            </div>
            <div>
              <label
                className="block text-[11px] font-medium tracking-[0.1em] uppercase mb-1.5"
                style={{ color: 'var(--ink4, #ababab)' }}
              >
                No. of deliverables
              </label>
              <input
                type="number"
                placeholder="e.g. 3"
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                className={inputClass}
                style={{
                  background: '#faf8f5',
                  borderColor: 'var(--border2)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--sans)',
                }}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              className="block text-[11px] font-medium tracking-[0.1em] uppercase mb-1.5"
              style={{ color: 'var(--ink4, #ababab)' }}
            >
              Personal message to creator
            </label>
            <textarea
              placeholder={`Hi ${creatorName}! We loved your Sikkim travel content and think you'd be a great fit for…`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className={`${inputClass} resize-none`}
              style={{
                background: '#faf8f5',
                borderColor: 'var(--border2)',
                color: 'var(--ink)',
                fontFamily: 'var(--sans)',
              }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={sending}
            className="w-full text-sm font-semibold py-[13px] rounded-full bg-[--ink] text-white border-none cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending…' : 'Send invite →'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
