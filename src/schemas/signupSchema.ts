import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(2, 'Username must be at least 2 characters')
  .max(10, 'Username must be no more than 10 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

const signUpSchema = z.object({
  username: usernameValidation,

  email: z.string().email({ message: 'Invalid email address' }),
  password: z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }),
});

export default signUpSchema;
