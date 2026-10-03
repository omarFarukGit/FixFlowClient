import { z } from "zod";

export const CreateServiceRequestFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters"),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address cannot exceed 255 characters"),

  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City cannot exceed 100 characters"),

  area: z
    .string()
    .min(1, "Area is required")
    .max(100, "Area cannot exceed 100 characters"),

  scheduledAt: z.string(),

  estimatedPrice: z.string(),

  categoryId: z.string().min(1, "Please select a service category"),
});
