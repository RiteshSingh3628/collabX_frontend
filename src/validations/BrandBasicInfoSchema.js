import { z } from "zod";

export const brandBasicInfoSchema = z.object({
  website: z.string().url("Please enter a valid URL").min(1, "Website is required"),
  brandName: z.string().min(1, "Brand name is required"),
  brandDescription: z.string().min(10, "Description must be at least 10 characters"),
});

export const DEFAULT_VALUES = {
  website: "",
  brandName: "",
  brandDescription: "",
};
