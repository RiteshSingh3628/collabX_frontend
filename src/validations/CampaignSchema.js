import { z } from "zod";

const taskSchema = z.object({
  type: z.enum(["video", "story", "reel", "post", "live", "blog"]),
  count: z.number().int().min(1, "Count must be at least 1"),
  period: z.enum(["day", "week", "month", "total"]),
  platform: z.string().optional(),
  deadline: z.string().optional(),
  instructions: z.string().max(2000).optional(),
});

const campaignFields = {
  title: z
    .string()
    .min(1, "Campaign title is required")
    .max(200, "Campaign title cannot exceed 200 characters"),

  goal: z.string().max(2000, "Goal cannot exceed 2000 characters").optional(),

  category: z.string().min(1, "Category is required"),

  campaignType: z.string().optional(),

  budget: z.number().positive("Budget must be positive").optional(),

  creatorsNeeded: z.number().int().min(1).optional(),

  startDate: z.string().min(1, "Start date is required"),

  endDate: z.string().optional(),

  product: z.string().max(200).optional(),

  tasks: z.array(taskSchema).optional(),

  platforms: z.array(z.string()).min(1, "At least one platform is required"),

  niches: z.array(z.string()).optional(),

  minFollowers: z.number().int().min(0).optional(),

  minEngagementRate: z.number().min(0).optional(),

  creatorTier: z
    .enum([
      "Nano (1K–10K)",
      "Micro (10K–100K)",
      "Mid-tier (100K–500K)",
      "Macro (500K–1M)",
      "Mega (1M+)",
      "",
    ])
    .optional(),

  preferredLocation: z.string().optional(),

  budgetPerCreator: z.number().positive().optional(),

  brief: z.string().max(5000).optional(),

  dos: z.array(z.string().max(500)).optional(),

  donts: z.array(z.string().max(500)).optional(),

  hashtags: z.array(z.string().max(100)).optional(),

  goLiveStart: z.string().optional(),

  goLiveEnd: z.string().optional(),

  trackingLink: z
    .string()
    .url("Invalid tracking URL")
    .optional()
    .or(z.literal("")),

  status: z.enum(["draft", "active", "paused", "completed"]).optional(),
};

export const saveDraftSchema = z.object({
  title: campaignFields.title.optional(),
  goal: campaignFields.goal,
  category: z.string().optional(),
  campaignType: campaignFields.campaignType,
  budget: campaignFields.budget,
  creatorsNeeded: campaignFields.creatorsNeeded,
  startDate: z.string().optional(),
  endDate: campaignFields.endDate,
  product: campaignFields.product,
  tasks: campaignFields.tasks,
  platforms: z.array(z.string()).optional(),
  niches: campaignFields.niches,
  minFollowers: campaignFields.minFollowers,
  minEngagementRate: campaignFields.minEngagementRate,
  creatorTier: campaignFields.creatorTier,
  preferredLocation: campaignFields.preferredLocation,
  budgetPerCreator: campaignFields.budgetPerCreator,
  brief: campaignFields.brief,
  dos: campaignFields.dos,
  donts: campaignFields.donts,
  hashtags: campaignFields.hashtags,
  goLiveStart: campaignFields.goLiveStart,
  goLiveEnd: campaignFields.goLiveEnd,
  trackingLink: campaignFields.trackingLink,
});

export const createCampaignSchema = z.object({
  title: campaignFields.title,
  goal: campaignFields.goal,
  category: campaignFields.category,
  campaignType: campaignFields.campaignType,
  budget: campaignFields.budget,
  creatorsNeeded: campaignFields.creatorsNeeded,
  startDate: campaignFields.startDate,
  endDate: campaignFields.endDate,
  product: campaignFields.product,
  tasks: campaignFields.tasks,
  platforms: campaignFields.platforms,
  niches: campaignFields.niches,
  minFollowers: campaignFields.minFollowers,
  minEngagementRate: campaignFields.minEngagementRate,
  creatorTier: campaignFields.creatorTier,
  preferredLocation: campaignFields.preferredLocation,
  budgetPerCreator: campaignFields.budgetPerCreator,
  brief: campaignFields.brief,
  dos: campaignFields.dos,
  donts: campaignFields.donts,
  hashtags: campaignFields.hashtags,
  goLiveStart: campaignFields.goLiveStart,
  goLiveEnd: campaignFields.goLiveEnd,
  trackingLink: campaignFields.trackingLink,
  status: campaignFields.status,
});

export const updateCampaignSchema = z
  .object({
    title: campaignFields.title.optional(),
    goal: campaignFields.goal,
    category: campaignFields.category.optional(),
    campaignType: campaignFields.campaignType,
    budget: campaignFields.budget,
    creatorsNeeded: campaignFields.creatorsNeeded,
    startDate: z.string().optional(),
    endDate: campaignFields.endDate,
    product: campaignFields.product,
    tasks: campaignFields.tasks,
    platforms: campaignFields.platforms.optional(),
    niches: campaignFields.niches,
    minFollowers: campaignFields.minFollowers,
    minEngagementRate: campaignFields.minEngagementRate,
    creatorTier: campaignFields.creatorTier,
    preferredLocation: campaignFields.preferredLocation,
    budgetPerCreator: campaignFields.budgetPerCreator,
    brief: campaignFields.brief,
    dos: campaignFields.dos,
    donts: campaignFields.donts,
    hashtags: campaignFields.hashtags,
    goLiveStart: campaignFields.goLiveStart,
    goLiveEnd: campaignFields.goLiveEnd,
    trackingLink: campaignFields.trackingLink,
    status: campaignFields.status,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

// ── Full wizard schema (single useForm instance across all steps) ──

export const wizardSchema = z.object({
  title: campaignFields.title,
  category: campaignFields.category,
  campaignType: z.string().optional(),
  goal: z.string().max(2000).optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  niches: z.array(z.string()).optional(),
  creatorsNeeded: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be a whole number")
    .min(1, "At least 1 creator is required"),
  budgetPerCreator: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .positive("Budget must be positive"),
  minFollowers: z.preprocess(
    v => (v === '' || v == null) ? undefined : Number(v),
    z.number().int().min(0).optional()
  ),
  minEngagementRate: z.preprocess(
    v => (v === '' || v == null) ? undefined : Number(v),
    z.number().min(0).optional()
  ),
  creatorTier: z.string().optional(),
  preferredLocation: z.string().optional(),
  tasks: z.array(z.any()).optional(),
  brief: z.string().min(1, "Key message is required").max(5000),
  dos: z.array(z.string()).optional(),
  donts: z.array(z.string()).optional(),
  hashtags: z.array(z.string()).optional(),
  goLiveStart: z.string().optional(),
  goLiveEnd: z.string().optional(),
});

// ── Client-side per-step schemas (coerce strings → numbers/dates) ──

export const step1Schema = z.object({
  title: campaignFields.title,
  category: campaignFields.category,
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  startDate: z.string().min(1, "Start date is required"),
});

export const step2Schema = z.object({
  creatorsNeeded: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be a whole number")
    .min(1, "At least 1 creator is required"),
  budgetPerCreator: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .positive("Budget per creator must be positive"),
});

export const step4Schema = z.object({
  brief: z
    .string()
    .min(1, "Key message is required")
    .max(5000, "Key message cannot exceed 5000 characters"),
});
