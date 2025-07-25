import { z } from "zod";
export const createEmailSchema = () =>
  z
    .string()
    .email("Не вірний формат email")
    .refine(
      (email) => {
        const parts = email.split("@");
        if (parts.length !== 2) {
          return false;
        }
        const localPart = parts[0];

        if (localPart.length < 2) {
          return false;
        }
        if (!/[a-zA-Z]/.test(localPart)) {
          return false;
        }
        return true;
      },
      {
        message: "Email має містити літери та цифри, а також не може починатися з цифри",
      }
    );
