import { z } from "zod";

export const createPasswordSchema = () =>
  z
    .string()
    .min(8, "Мінімальна довжина пароля - 8 символів")
    .max(20, "Максимальна довжина пароля - 20 символів")
    .refine((value) => !/[а-яА-ЯґҐєЄіІїЇ]/.test(value), {
      message: "Пароль не може містити кириличні символи",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Пароль має містити принаймні одну велику літеру",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Пароль має містити принаймні одну малу літеру",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Пароль має містити принаймні одну цифру",
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: "Пароль має містити принаймні один спеціальний символ",
    });

export const createConfirmPasswordSchema = (t) => z.string().min(8, "Мінімальна довжина пароля - 8 символів");
