export const TASK_META = {
  reel: {
    label: 'Reel',
    cls: 'icon-reel',
    defaultCount: 2,
    defaultPeriod: 'week',
    svg: '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
    color: '#6a3aa0',
    bg: 'rgba(106,58,160,.1)',
  },
  story: {
    label: 'Story',
    cls: 'icon-story',
    defaultCount: 3,
    defaultPeriod: 'day',
    svg: '<rect x="7" y="2" width="10" height="20" rx="2"/>',
    color: 'var(--amber)',
    bg: 'rgba(160,98,10,.1)',
  },
  post: {
    label: 'Static post',
    cls: 'icon-post',
    defaultCount: 1,
    defaultPeriod: 'week',
    svg: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    color: 'var(--blue)',
    bg: 'rgba(26,79,212,.1)',
  },
  video: {
    label: 'Video',
    cls: 'icon-video',
    defaultCount: 1,
    defaultPeriod: 'week',
    svg: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
    color: 'var(--red)',
    bg: 'rgba(212,58,42,.1)',
  },
  live: {
    label: 'Live session',
    cls: 'icon-live',
    defaultCount: 1,
    defaultPeriod: 'month',
    svg: '<circle cx="12" cy="12" r="2"/><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/>',
    color: 'var(--green)',
    bg: 'rgba(26,122,69,.1)',
  },
  blog: {
    label: 'Blog/Article',
    cls: 'icon-blog',
    defaultCount: 1,
    defaultPeriod: 'total',
    svg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>',
    color: 'var(--ink2)',
    bg: 'rgba(15,15,15,.06)',
  },
}

export const PERIOD_LABELS = {
  day: 'per day',
  week: 'per week',
  month: 'per month',
  total: 'total',
}

export function taskLine(task) {
  const m = TASK_META[task.type]
  if (!m) return ''
  const plural = task.count > 1 ? 's' : ''
  const period = PERIOD_LABELS[task.period] || task.period
  const plat = task.platform ? ` · ${task.platform}` : ''
  return `${task.count} ${m.label.toLowerCase()}${plural} ${period}${plat}`
}

export function fmtDate(d) {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${parseInt(day)} ${months[parseInt(m) - 1]}`
}

export function fmtINR(n) {
  return '₹' + Number(n).toLocaleString('en-IN')
}

export function buildPayload(formData) {
  const creatorsNeeded = formData.creatorsNeeded ? Number(formData.creatorsNeeded) : undefined
  const budgetPerCreator = formData.budgetPerCreator ? Number(formData.budgetPerCreator) : undefined

  return {
    title: formData.title || undefined,
    category: formData.category || undefined,
    campaignType: formData.campaignType || undefined,
    goal: formData.goal || undefined,
    startDate: formData.startDate || undefined,
    endDate: formData.endDate || undefined,
    platforms: formData.platforms?.length ? formData.platforms : undefined,
    niches: formData.niches?.length ? formData.niches : undefined,
    creatorsNeeded,
    budgetPerCreator,
    budget: creatorsNeeded && budgetPerCreator ? creatorsNeeded * budgetPerCreator : undefined,
    minFollowers: formData.minFollowers ? Number(formData.minFollowers) : undefined,
    minEngagementRate: formData.minEngagementRate ? Number(formData.minEngagementRate) : undefined,
    creatorTier: formData.creatorTier || undefined,
    preferredLocation: formData.preferredLocation || undefined,
    brief: formData.brief || undefined,
    dos: formData.dos?.filter(Boolean).length ? formData.dos.filter(Boolean) : undefined,
    donts: formData.donts?.filter(Boolean).length ? formData.donts.filter(Boolean) : undefined,
    hashtags: formData.hashtags?.length ? formData.hashtags : undefined,
    goLiveStart: formData.goLiveStart || undefined,
    goLiveEnd: formData.goLiveEnd || undefined,
    tasks: formData.tasks?.map(t => ({
      type: t.type,
      count: t.count,
      period: t.period,
      platform: t.platform || undefined,
      deadline: t.deadline || undefined,
      instructions: t.note || undefined,
    })) || [],
  }
}

export const CATEGORIES = [
  'Fitness & Wellness', 'Fashion & Beauty', 'Food & Lifestyle',
  'Perfume & Fragrance', 'Technology', 'Travel & Tourism',
  'Finance & Business', 'Gaming & Entertainment', 'Education',
  'Home & Living', 'Other',
]

export const CAMPAIGN_TYPES = [
  'Product promotion', 'Brand awareness', 'Product launch',
  'Event coverage', 'Content series', 'Product review', 'Affiliate',
]

export const CREATOR_TIERS = [
  'Nano (1K–10K)', 'Micro (10K–100K)', 'Mid-tier (100K–500K)',
  'Macro (500K–1M)', 'Mega (1M+)',
]

export const LOCATIONS = [
  'Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad',
  'Chennai', 'Pune', 'Pan India',
]

export const NICHES = [
  'Fitness', 'Nutrition', 'Lifestyle', 'Fashion', 'Beauty', 'Skincare',
  'Tech', 'Gaming', 'Travel', 'Food', 'Parenting', 'Finance',
  'Education', 'Entertainment', 'Sports', 'Fragrance',
]

export const PLATFORMS = [
  {
    value: 'Instagram',
    svg: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
  },
  {
    value: 'YouTube',
    svg: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="none" fill="currentColor"/>',
  },
  {
    value: 'Twitter/X',
    svg: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
  },
  {
    value: 'LinkedIn',
    svg: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  },
  {
    value: 'Snapchat',
    svg: '<path d="M12 2C7 2 4 5.5 4 9.5c0 3 1 4.5 1 4.5l-1 2s2 .5 2 1.5c0 0 .5 1.5 3 2 0 0 0 1.5 3 1.5s3-1.5 3-1.5c2.5-.5 3-2 3-2 0-1 2-1.5 2-1.5l-1-2s1-1.5 1-4.5C20 5.5 17 2 12 2z"/>',
  },
  {
    value: 'Podcast',
    svg: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
  },
]
