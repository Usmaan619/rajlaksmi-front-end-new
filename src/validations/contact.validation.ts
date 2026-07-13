import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),

  lastName: z.string().min(1, "Last Name is required"),

  email: z.string().email("Invalid email address"),

  mobile: z
    .string()
    .min(10, "Mobile number must be 10 digits")
    .max(10, "Mobile number must be 10 digits"),

  queryType: z.string().min(1, "Please select query type"),

  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const newsLatterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type newsLatterFormData = z.infer<typeof newsLatterSchema>;



export const b2bInquirySchema = z.object({
  fullName: z
    .string()
    .min(3, "Full Name must be at least 3 characters")
    .max(100, "Full Name is too long"),

  businessName: z
    .string()
    .min(2, "Business Name is required")
    .max(150, "Business Name is too long"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),

  email: z
    .string()
    .email("Invalid email address"),

  businessType: z
    .string()
    .min(1, "Please select business type"),

  bulkRequirement: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => val?.trim() || null),

  message: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => val?.trim() || null),
});

export type B2BFormData = z.infer<typeof b2bInquirySchema>;
