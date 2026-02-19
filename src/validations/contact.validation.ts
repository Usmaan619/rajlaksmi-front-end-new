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
