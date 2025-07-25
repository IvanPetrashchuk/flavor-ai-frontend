"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLoginSchema } from "@schemas/mainLoginSchema";
import { useAlert } from "@components/ui/AlertMessage/AlertContext";
import InputFiled from "@components/ui/InputFiled";
import PasswordField from "@components/ui/PasswordField";
import { URLS } from "@constants/urls";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@lib/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const { addAlert } = useAlert();
  const loginSchema = createLoginSchema();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleLoginSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(resultAction)) {
        addAlert("Login successful!", "success");
        router.push(URLS.RECEPTS);
      } else {
        throw new Error(resultAction.payload || "Login failed. Please try again.");
      }
    } catch (err) {
      addAlert(err.message || "An unknown error.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit(handleLoginSubmit)} className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <InputFiled
            labelText={"Email"}
            htmlForName={"email"}
            typeInput={"text"}
            placeholderText={"Введіть ваш email"}
            classNameInputFiled="mb-4 mt-2"
            {...control.register("email")}
            error={errors.email?.message}
            autoComplete="email"
          />

          <PasswordField
            labelText={"Пароль"}
            htmlForName={"password"}
            placeholderText={"Введіть ваш пароль"}
            classNameValue="mb-4 mt-2"
            typeInput="password"
            {...control.register("password")}
            error={errors.password?.message}
            autoComplete="current-password"
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
              disabled={loading}
            >
              {loading ? "Вхід..." : "Ввійти"}
            </button>
          </div>

          <div className="text-center pt-4 text-sm">
            <Link href={URLS.REGISTER} className="text-blue-600 hover:underline ml-2">
              Створити обліковий запис
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}