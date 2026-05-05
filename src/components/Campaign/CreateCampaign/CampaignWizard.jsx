'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { publishCampaign, saveCampaignDraft } from '@/framework/server-action/campaign/action'
import { wizardSchema } from '@/validations/CampaignSchema'
import { buildPayload } from './utils'
import StepIndicator from './StepIndicator'
import StepNavigation from './StepNavigation'
import Sidebar from './Sidebar'
import SuccessOverlay from './SuccessOverlay'
import Step1Basics from './steps/Step1Basics'
import Step2Requirements from './steps/Step2Requirements'
import Step3Deliverables from './steps/Step3Deliverables'
import Step4Brief from './steps/Step4Brief'
import Step5Preview from './steps/Step5Preview'

const INITIAL_FORM = {
  title: '',
  category: '',
  campaignType: '',
  goal: '',
  startDate: '',
  endDate: '',
  platforms: [],
  niches: [],
  creatorsNeeded: '',
  budgetPerCreator: '',
  minFollowers: '',
  minEngagementRate: '',
  creatorTier: '',
  preferredLocation: '',
  tasks: [],
  brief: '',
  dos: [],
  donts: [],
  hashtags: ['#Ad', '#Sponsored'],
  goLiveStart: '',
  goLiveEnd: '',
}

const STEP_FIELDS = {
  1: ['title', 'category', 'platforms', 'startDate'],
  2: ['creatorsNeeded', 'budgetPerCreator'],
  3: [],
  4: ['brief'],
}

export default function CampaignWizard({ user }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [stepDir, setStepDir] = useState('fwd')
  const [showSuccess, setShowSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { control, trigger, getValues, watch, setError, formState: { errors } } = useForm({
    resolver: zodResolver(wizardSchema),
    defaultValues: INITIAL_FORM,
    mode: 'onTouched',
  })

  const handleActionError = (result) => {
    if (result?.code === 'AUTH_REQUIRED') {
      toast.error('Session expired — please log in again.')
      router.push('/login')
      return
    }
    if (result?.code === 'BRAND_NOT_FOUND') {
      toast.error('Brand profile not found. Complete your brand setup first.', {
        action: { label: 'Set up brand', onClick: () => router.push('/onboarding/brand') },
        duration: 6000,
      })
      return
    }
    if (result?.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([key, msg]) =>
        setError(key, { message: msg })
      )
      toast.error(result.message || 'Validation failed')
      return
    }
    toast.error(result?.message || 'Something went wrong')
  }

  const goStep = async (n) => {
    if (n < 1 || n > 5) return
    if (n > step) {
      const fields = STEP_FIELDS[step]
      if (fields?.length) {
        const ok = await trigger(fields)
        if (!ok) return
      }
    }
    setStepDir(n > step ? 'fwd' : 'back')
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleJump = (n) => {
    if (n < step) goStep(n)
  }

  const handlePublish = () => {
    startTransition(async () => {
      const result = await publishCampaign(buildPayload(getValues()))
      if (result?.success) {
        setShowSuccess(true)
      } else {
        handleActionError(result)
      }
    })
  }

  const handleSaveDraft = () => {
    startTransition(async () => {
      const result = await saveCampaignDraft(buildPayload(getValues()))
      if (result?.success) {
        toast.success('Draft saved successfully')
      } else {
        handleActionError(result)
      }
    })
  }

  const isPreview = step === 5
  const animClass = stepDir === 'fwd' ? 'cc-anim-step-in' : 'cc-anim-step-back'

  return (
    <>
      <div style={{
        maxWidth: 1060, margin: '0 auto',
        padding: '16px 20px 80px',
        display: 'grid',
        gridTemplateColumns: isPreview ? '1fr' : '1fr 292px',
        gap: 22, alignItems: 'start',
      }}>
        <div>
          {!isPreview && <StepIndicator step={step} onJump={handleJump} />}

          <div key={step} className={animClass}>
            {step === 1 && <Step1Basics control={control} />}
            {step === 2 && <Step2Requirements control={control} />}
            {step === 3 && <Step3Deliverables control={control} />}
            {step === 4 && <Step4Brief control={control} />}
            {step === 5 && (
              <Step5Preview
                formData={watch()}
                onEdit={() => goStep(1)}
                onBack={() => goStep(4)}
                onPublish={handlePublish}
                isPending={isPending}
              />
            )}
          </div>

          {!isPreview && (
            <StepNavigation
              step={step}
              onBack={() => goStep(step - 1)}
              onNext={() => goStep(step + 1)}
              onPreview={() => goStep(5)}
              isPending={isPending}
            />
          )}
        </div>

        {!isPreview && (
          <Sidebar
            formData={watch()}
            step={step}
            onJump={handleJump}
            onSaveDraft={handleSaveDraft}
            isPending={isPending}
          />
        )}
      </div>

      <SuccessOverlay open={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  )
}
