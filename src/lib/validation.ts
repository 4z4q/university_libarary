import { z } from "zod";

export const signUpSchema = z.object(
  {
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    universityId: z.number(),
    universityCard: z.string().nonempty("University Cards required"),
  },
  {
    required_error: "All fields are required",
  }
);

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});