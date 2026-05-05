import { useState, useEffect, useRef } from 'react'
import { useFieldArray, Controller } from 'react-hook-form'
import { TASK_META, taskLine } from '../utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const TASK_TYPES = ['reel', 'story', 'post', 'video', 'live', 'blog']

const ADD_BTN_ICONS = {
  reel:  '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
  story: '<rect x="7" y="2" width="10" height="20" rx="2"/>',
  post:  '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
  video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
  live:  '<circle cx="12" cy="12" r="2"/><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/>',
  blog:  '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>',
}

export default function Step3Deliverables({ control }) {
  const { fields: tasks, append, remove } = useFieldArray({ control, name: 'tasks' })
  const [openIds, setOpenIds] = useState(new Set())
  const prevLengthRef = useRef(tasks.length)

  useEffect(() => {
    if (tasks.length > prevLengthRef.current && tasks.length > 0) {
      setOpenIds(prev => new Set([...prev, tasks[tasks.length - 1].id]))
    }
    prevLengthRef.current = tasks.length
  }, [tasks.length])

  const addTask = (type) => {
    const m = TASK_META[type]
    append({ type, count: m.defaultCount, period: m.defaultPeriod, platform: '', deadline: '', note: '' })
  }

  const removeTask = (index, id) => {
    remove(index)
    setOpenIds(prev => { const n = new Set(prev); n.delete(id); return n })
  }

  const toggleTask = (id) => {
    setOpenIds(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, opacity: .6 }}>
            <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 400, color: 'var(--ink)' }}>Deliverables</span>
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--ink4)', fontWeight: 300, marginBottom: 22 }}>
        Define exactly what content each creator must produce
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink2)' }}>Tasks</span>
        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 100, background: 'var(--blue-bg)', color: 'var(--blue)' }}>
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
        {tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--ink4)', fontSize: 13, fontWeight: 300, border: '1.5px dashed var(--border)', borderRadius: 12 }}>
            No deliverables added yet — use the buttons below
          </div>
        ) : tasks.map((task, index) => {
          const m = TASK_META[task.type]
          const isOpen = openIds.has(task.id)
          return (
            <div key={task.id} className="cc-anim-slide-in" style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface)', overflow: 'hidden' }}>
              {/* Task head */}
              <div
                onClick={() => toggleTask(task.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', cursor: 'pointer', transition: 'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(15,15,15,.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2.5, opacity: .25, flexShrink: 0, padding: '2px 3px' }}>
                  {[0,1,2].map(i => <span key={i} style={{ width: 13, height: 1.5, background: 'var(--ink)', borderRadius: 1, display: 'block' }} />)}
                </div>
                <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: m.bg, color: m.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}
                    dangerouslySetInnerHTML={{ __html: m.svg }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{m.label}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink4)', marginTop: 1 }}>{taskLine(task)}</div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={e => { e.stopPropagation(); removeTask(index, task.id) }}
                  className="h-[26px] w-[26px] shrink-0 rounded-[7px] border border-(--border) p-0 text-(--ink2) hover:border-(--red-border) hover:bg-(--red-bg) hover:text-(--red)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12, opacity: .5 }}>
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                  </svg>
                </Button>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ width: 16, height: 16, opacity: .3, flexShrink: 0, transition: 'transform .2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Task body */}
              {isOpen && (
                <div style={{ padding: '14px', borderTop: '1px solid var(--border)' }}>
                  {/* Quantity & frequency */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--ink3)', marginBottom: 5 }}>Quantity &amp; frequency</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <Controller
                        name={`tasks.${index}.count`}
                        control={control}
                        render={({ field }) => (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 9, padding: '5px 10px 5px 12px', width: 'fit-content' }}>
                            <Input
                              type="number"
                              min="1"
                              value={field.value}
                              onChange={e => field.onChange(Math.max(1, parseInt(e.target.value) || 1))}
                              className="h-auto w-10 border-none bg-transparent p-0 text-center text-sm font-medium shadow-none focus:border-none focus:bg-transparent"
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              {[1, -1].map((d, i) => (
                                <button key={i} type="button" onClick={() => field.onChange(Math.max(1, field.value + d))} style={{
                                  width: 20, height: 15, border: '1px solid var(--border)', background: '#fff',
                                  fontSize: 9, color: 'var(--ink3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  cursor: 'pointer', transition: 'all .1s',
                                  borderRadius: i === 0 ? '4px 4px 0 0' : '0 0 4px 4px',
                                  borderTop: i === 1 ? 'none' : undefined,
                                }}>{d > 0 ? '▲' : '▼'}</button>
                              ))}
                            </div>
                          </div>
                        )}
                      />
                      <span style={{ fontSize: 12, color: 'var(--ink3)' }}>{m.label.toLowerCase()}s</span>
                      <Controller
                        name={`tasks.${index}.period`}
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-auto w-fit py-[5px] text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="day">per day</SelectItem>
                              <SelectItem value="week">per week</SelectItem>
                              <SelectItem value="month">per month</SelectItem>
                              <SelectItem value="total">total (whole campaign)</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  {/* Platform + Deadline */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--ink3)', marginBottom: 5 }}>Platform</div>
                      <Controller
                        name={`tasks.${index}.platform`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value || '__none__'}
                            onValueChange={v => field.onChange(v === '__none__' ? '' : v)}
                          >
                            <SelectTrigger className="h-9 w-full text-xs">
                              <SelectValue placeholder="Same as campaign" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none__">Same as campaign</SelectItem>
                              {['Instagram','YouTube','Twitter/X','LinkedIn','Snapchat'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--ink3)', marginBottom: 5 }}>Deadline</div>
                      <Controller
                        name={`tasks.${index}.deadline`}
                        control={control}
                        render={({ field }) => (
                          <Input type="date" {...field} className="h-9 text-xs" />
                        )}
                      />
                    </div>
                  </div>

                  {/* Instructions */}
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--ink3)', marginBottom: 5 }}>Task-specific instructions</div>
                    <Controller
                      name={`tasks.${index}.note`}
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none resize-y min-h-[58px] leading-relaxed focus:bg-white focus:border-slate-400 placeholder:text-slate-400 transition-colors"
                          placeholder="e.g. Must show product unboxing, include coupon code in caption."
                        />
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add buttons */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {TASK_TYPES.map(type => (
          <Button
            key={type}
            type="button"
            variant="outline"
            onClick={() => addTask(type)}
            className="h-auto gap-1.5 rounded-[9px] border-dashed px-[13px] py-2 text-xs font-normal text-(--ink3) hover:border-slate-400 hover:text-(--ink)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ width: 13, height: 13, opacity: .55, flexShrink: 0 }}
              dangerouslySetInnerHTML={{ __html: ADD_BTN_ICONS[type] }} />
            {TASK_META[type].label}
          </Button>
        ))}
      </div>
    </div>
  )
}
