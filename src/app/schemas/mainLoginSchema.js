import { z } from "zod";
import { createEmailSchema } from "./emailSchema";
import { createPasswordSchema } from "./passwordSchema";

export const createLoginSchema = ( isPasswordOptional = false) => {
  return z.object({
    email: createEmailSchema(),
    password: isPasswordOptional ? createPasswordSchema().optional() : createPasswordSchema(),
  });
};
