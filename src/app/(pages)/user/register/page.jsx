"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { createRegisterSchema } from "@schemas/mainRegisterSchema"; 

import { useAlert } from "@components/ui/AlertMessage/AlertContext";
import InputFiled from "@components/ui/InputFiled";
import PasswordField from "@components/ui/PasswordField";
import { URLS, API_URLS } from "@constants/urls"; 

export default function RegisterPage() {
  const router = useRouter();
  const { addAlert } = useAlert();
  const registerSchema = createRegisterSchema();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register, 
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });


  const handleRegisterSubmit = async (data) => {
    setIsLoading(true);

    try {

      const bodyData = {
        email: data.email,
        password_plain: data.password, 
      };

      const response = await fetch(API_URLS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed. Please try again.");
      }

      const result = await response.json();

      addAlert("Registration successful!", "success");
    
      router.push(URLS.LOGIN); 
    } catch (error) {
      addAlert(error.message || "An unknown error occurred.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit(handleRegisterSubmit)} className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Створити обліковий запис</h2>
          
          <InputFiled
            labelText={"Email"}
            htmlForName={"email"}
            typeInput={"text"}
            placeholderText={"Введіть ваш email"}
            classNameInputFiled="mb-4 mt-2"
            {...register("email")} 
            error={errors.email?.message}
            autoComplete="email"
          />

          <PasswordField
            labelText={"Пароль"}
            htmlForName={"password"}
            placeholderText={"Введіть ваш пароль"}
            classNameValue="mb-4 mt-2"
            typeInput="password"
            {...register("password")} //
            error={errors.password?.message}
            autoComplete="new-password" 
          />

          <PasswordField
            labelText={"Підтвердження паролю"}
            htmlForName={"confirmPassword"}
            placeholderText={"Повторіть ваш пароль"}
            classNameValue="mb-4 mt-2"
            typeInput="password"
            {...register("confirmPassword")} 
            error={errors.confirmPassword?.message}
            autoComplete="new-password" 
          />
     
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                type="checkbox"
                value=""
                id="rememberPassword"
              />
              <label htmlFor="rememberPassword" className="ml-2 block text-sm text-gray-900">
                Запам'ятати мене
              </label>
            </div>
            <Link href={URLS.FORGOTPASSWORD} className="text-blue-600 hover:underline text-sm">
              Забули пароль?
            </Link>
          </div>

          <div className="grid py-6 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              disabled={isLoading} 
            >
              {isLoading ? "Реєстрація..." : "Зареєструватись"}
            </button>
          </div>

          <div className="text-center pt-4 text-sm">
            <span>Вже маєте обліковий запис?</span>
            <Link href={URLS.LOGIN} className="text-blue-600 hover:underline ml-2">
              Увійти
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}