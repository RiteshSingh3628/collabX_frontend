import { useRef } from 'react'
import { useController } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ErrorMsg = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--red)', fontWeight: 400, marginTop: 2 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11, flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    {children}
  </div>
)

export default function Step4Brief({ control }) {
  const tagInputRef = useRef(null)

  const { field: briefField, fieldState: briefState } = useController({ name: 'brief', control })
  const { field: dosField } = useController({ name: 'dos', control })
  const { field: dontsField } = useController({ name: 'donts', control })
  const { field: hashtagsField } = useController({ name: 'hashtags', control })
  const { field: goLiveStartField } = useController({ name: 'goLiveStart', control })
  const { field: goLiveEndField } = useController({ name: 'goLiveEnd', control })

  const addDo    = () => dosField.onChange([...(dosField.value || []), ''])
  const removeDo = (i) => dosField.onChange(dosField.value.filter((_, idx) => idx !== i))
  const updateDo = (i, v) => { const a = [...dosField.value]; a[i] = v; dosField.onChange(a) }

  const addDont    = () => dontsField.onChange([...(dontsField.value || []), ''])
  const removeDont = (i) => dontsField.onChange(dontsField.value.filter((_, idx) => idx !== i))
  const updateDont = (i, v) => { const a = [...dontsField.value]; a[i] = v; dontsField.onChange(a) }

  const addTag = (raw) => {
    const v = raw.trim()
    if (!v) return
    const tag = (v.startsWith('#') || v.startsWith('@')) ? v : '#' + v
    if (!hashtagsField.value?.includes(tag)) {
      hashtagsField.onChange([...(hashtagsField.value || []), tag])
    }
  }

  const removeTag = (tag) => {
    hashtagsField.onChange(hashtagsField.value.filter(t => t !== tag))
  }

  const handleTagKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      addTag(e.target.value)
      e.target.value = ''
    } else if (e.key === 'Backspace' && !e.target.value && hashtagsField.value?.length) {
      removeTag(hashtagsField.value[hashtagsField.value.length - 1])
    }
  }

  const DoDontRow = ({ value, onUpdate, onRemove, isYes }) => (
    <div className="cc-anim-slide-in" style={{
      display: 'flex', alignItems: 'center', gap: 7,
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 8, padding: '7px 8px 7px 11px', marginBottom: 6,
    }}>
      <span style={{ fontSize: 11, fontWeight: 600, flexShrink: 0, color: isYes ? 'var(--green)' : 'var(--red)' }}>
        {isYes ? '✓' : '✕'}
      </span>
      <Input
        className="h-auto flex-1 border-none bg-transparent p-0 text-[13px] shadow-none focus:border-none focus:bg-transparent"
        placeholder={isYes ? 'e.g. Show product in natural daylight' : 'e.g. Do not compare with competitors'}
        value={value}
        onChange={e => onUpdate(e.target.value)}
        autoFocus
      />
      <Button
        type="button"
        variant="ghost"
        onClick={onRemove}
        className="h-5 w-5 shrink-0 rounded p-0 text-(--ink4) hover:bg-(--red-bg) hover:text-(--red)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </Button>
    </div>
  )

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, opacity: .6 }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 400, color: 'var(--ink)' }}>Campaign brief</span>
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--ink4)', fontWeight: 300, marginBottom: 22 }}>
        Give creators the context and guidelines they need to produce great content
      </div>

      {/* Key message */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink2)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Key message</span>
          <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 400 }}>required</span>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink4)', lineHeight: 1.5, fontWeight: 300 }}>
          The single most important thing creators must communicate to their audience
        </div>
        <textarea
          {...briefField}
          className={`w-full rounded-[10px] border px-3.5 py-2.5 text-sm outline-none resize-y min-h-[88px] leading-relaxed transition-colors focus:bg-white placeholder:text-slate-500 mt-1.5 ${briefState.error ? 'border-destructive bg-red-50/40' : 'border-slate-200 focus:border-slate-400'}`}
          placeholder="e.g. Our Summer Bloom perfume is light, floral and made for real everyday moments — authentic, not aspirational."
        />
        {briefState.error && <ErrorMsg>{briefState.error.message}</ErrorMsg>}
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

      {/* Do's & Don'ts */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink2)', marginBottom: 4 }}>Content guidelines</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink4)', lineHeight: 1.5, fontWeight: 300, marginBottom: 8 }}>
          Be specific — vague guidelines lead to off-brief content
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Do's */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: 'var(--green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10, color: 'var(--green)' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--green)' }}>Do&apos;s</span>
            </div>
            {(dosField.value || []).map((v, i) => (
              <DoDontRow key={i} value={v} onUpdate={(val) => updateDo(i, val)} onRemove={() => removeDo(i)} isYes />
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addDo}
              className="mt-1 h-auto w-full justify-center gap-1.5 rounded-lg border-dashed py-[7px] text-xs font-normal text-(--ink4) hover:border-slate-400 hover:bg-white hover:text-(--ink2)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add a Do
            </Button>
          </div>

          {/* Don'ts */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: 'var(--red-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10, color: 'var(--red)' }}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--red)' }}>Don&apos;ts</span>
            </div>
            {(dontsField.value || []).map((v, i) => (
              <DoDontRow key={i} value={v} onUpdate={(val) => updateDont(i, val)} onRemove={() => removeDont(i)} isYes={false} />
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addDont}
              className="mt-1 h-auto w-full justify-center gap-1.5 rounded-lg border-dashed py-[7px] text-xs font-normal text-(--ink4) hover:border-slate-400 hover:bg-white hover:text-(--ink2)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add a Don&apos;t
            </Button>
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

      {/* Hashtags */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink2)', marginBottom: 4 }}>Mandatory hashtags &amp; mentions</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink4)', lineHeight: 1.5, fontWeight: 300, marginBottom: 6 }}>
          Creators must include these in every post · Press Enter or Space to add
        </div>
        <div
          onClick={() => tagInputRef.current?.focus()}
          style={{
            display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
            minHeight: 42, padding: '8px 12px',
            border: '1.5px solid var(--border)', borderRadius: 10,
            background: 'var(--surface)', cursor: 'text', transition: 'border-color .15s',
          }}
        >
          {(hashtagsField.value || []).map(tag => (
            <span key={tag} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '3px 8px 3px 10px', borderRadius: 100,
              fontSize: 12.5, fontWeight: 500,
              background: 'var(--red-bg)', color: 'var(--red)', border: '1px solid var(--red-border)',
            }}>
              {tag}
              <button type="button" onClick={() => removeTag(tag)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--red)', opacity: .6, padding: 0, display: 'flex', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = .6}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 9, height: 9 }}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </span>
          ))}
          <Input
            ref={tagInputRef}
            className="h-auto min-w-[100px] flex-1 border-none bg-transparent p-0 text-[13px] shadow-none focus:border-none focus:bg-transparent"
            placeholder="#hashtag or @mention"
            onKeyDown={handleTagKey}
          />
        </div>
      </div>

      {/* Go-live window */}
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink2)', display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span>Content go-live window</span>
          <span style={{ color: 'var(--ink4)', fontSize: 11.5, fontWeight: 400 }}>optional</span>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink4)', lineHeight: 1.5, fontWeight: 300, marginBottom: 6 }}>
          The exact dates creators must publish within
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 24px 1fr', alignItems: 'center', gap: 8 }}>
          <Input type="date" {...goLiveStartField} />
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink4)' }}>→</div>
          <Input type="date" {...goLiveEndField} />
        </div>
      </div>
    </div>
  )
}
