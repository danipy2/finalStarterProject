import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../services/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit: SubmitHandler<SignupFormData> = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    try {
      const result = await signup({ ...formData, role: "user" }).unwrap();
      navigate(`/verify?email=${formData.email}`);
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      const errMessage = error.data?.message || "Signup failed";

      if (errMessage.toLowerCase().includes("email")) {
        setError("email", { message: errMessage });
      } else {
        setError("name", { message: errMessage });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Sign Up Today!
        </h2>

        <div className="text-center text-sm text-gray-500 mb-4">
          or Sign Up with Email
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <input
            {...register("name", { required: "Full name is required" })}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter email address"
            className="w-full px-4 py-2 border rounded text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded text-sm"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
            })}
            placeholder="Confirm password"
            className="w-full px-4 py-2 border rounded text-sm"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded text-sm"
          >
            Continue
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-indigo-600 hover:underline font-medium"
          >
            Login
          </a>
        </div>

        <p className="text-[10px] text-gray-500 mt-4 text-center">
          By clicking Continue, you acknowledge that you have read and accepted
          our{" "}
          <a href="/terms" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
