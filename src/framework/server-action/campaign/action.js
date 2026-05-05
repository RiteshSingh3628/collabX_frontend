'use server'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/utils/auth'
import URLS from '@/constants/urls'
import apiClient from '@/lib/utils/apiClient'
import { createCampaignSchema, saveDraftSchema } from '@/validations/CampaignSchema'

function flattenZodErrors(error) {
  const errors = {}
  for (const issue of error.issues) {
    const key = issue.path.join('.')
    if (!errors[key]) errors[key] = issue.message
  }
  return errors
}

async function getAuthSession() {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return null
  }
  return session
}

export async function publishCampaign(payload) {
  const session = await getAuthSession()
  if (!session) {
    return { success: false, message: 'Session expired — please log in again.', code: 'AUTH_REQUIRED' }
  }

  const parsed = createCampaignSchema.safeParse(payload)
  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the highlighted fields before publishing',
      fieldErrors: flattenZodErrors(parsed.error),
    }
  }

  try {
    const response = await apiClient(URLS.CAMPAIGN.PUBLISH, {
      method: 'POST',
      body: JSON.stringify(parsed.data),
      session,
    })

    if (!response?.success) {
      const message = response?.message || 'Failed to publish campaign'
      const code = message.toLowerCase().includes('brand') ? 'BRAND_NOT_FOUND' : undefined
      return { success: false, message, code }
    }

    return { success: true, data: response.data }
  } catch {
    return { success: false, message: 'An unexpected error occurred' }
  }
}

export async function saveCampaignDraft(payload) {
  const session = await getAuthSession()
  if (!session) {
    return { success: false, message: 'Session expired — please log in again.', code: 'AUTH_REQUIRED' }
  }

  const parsed = saveDraftSchema.safeParse(payload)
  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the highlighted fields before saving',
      fieldErrors: flattenZodErrors(parsed.error),
    }
  }

  try {
    const response = await apiClient(URLS.CAMPAIGN.DRAFT, {
      method: 'POST',
      body: JSON.stringify(parsed.data),
      session,
    })

    if (!response?.success) {
      const message = response?.message || 'Failed to save draft'
      const code = message.toLowerCase().includes('brand') ? 'BRAND_NOT_FOUND' : undefined
      return { success: false, message, code }
    }

    return { success: true, data: response.data }
  } catch {
    return { success: false, message: 'An unexpected error occurred' }
  }
}
