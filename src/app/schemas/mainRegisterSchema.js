import { z } from "zod";

import { createEmailSchema } from "./emailSchema";
import { createPasswordSchema, createConfirmPasswordSchema } from "./passwordSchema";

export const createRegisterSchema = () => {
  return z
    .object({
      email: createEmailSchema(),
      password: createPasswordSchema(),
      confirmPassword: createConfirmPasswordSchema(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Паролі не збігаються",
          path: ["confirmPassword"],
        });
      }
    });
};
