import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../services/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface OtpFormData {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
}

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  const [verifyEmail] = useVerifyEmailMutation();
  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OtpFormData>();

  // Watch OTP fields
  const otp1 = watch("otp1", "");
  const otp2 = watch("otp2", "");
  const otp3 = watch("otp3", "");
  const otp4 = watch("otp4", "");
  const allFieldsFilled = otp1 && otp2 && otp3 && otp4;

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Submit handler
  const onSubmit: SubmitHandler<OtpFormData> = async (formData) => {
    const otp = `${formData.otp1}${formData.otp2}${formData.otp3}${formData.otp4}`;

    try {
      const result = await verifyEmail({ email, OTP: otp }).unwrap();
      if (result) {
        navigate("/signin");
      }
    } catch (err) {
      const error = err as FetchBaseQueryError & { data?: { message?: string } };
      const message = error.data?.message || "Invalid verification code";
      setError("otp1", { message });
    }
  };

  // Resend handler
  const handleResend = async () => {
    if (timer > 0 || resending) return;
    setResending(true);
    await verifyEmail({ email, OTP: "0000" }); // mock resend
    setTimer(30);
    setResending(false);
  };

  // Handle OTP input changes
  const handleOtpChange = (index: number, value: string) => {
    setValue(`otp${index + 1}` as keyof OtpFormData, value);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Verify Email</h2>

        <p className="text-gray-600 mb-6">
          We've sent a verification code to the email address you
          <br />
          provided. To complete the verification process, please
          <br />
          enter the code here.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          Sent to: <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center gap-4 mb-6">
            {[0, 1, 2, 3].map((index) => {
              const { ref, ...rest } = register(
                `otp${index + 1}` as keyof OtpFormData,
                {
                  required: "Code is required",
                  pattern: { value: /^[0-9]$/, message: "Digits only" },
                  onChange: (e) => handleOtpChange(index, e.target.value),
                }
              );

              return (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  autoFocus={index === 0}
                  {...rest}
                  ref={(el) => {
                    ref(el); // RHF's ref
                    inputRefs.current[index] = el; // local ref
                  }}
                  className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-lg 
                             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                             transition-colors"
                />
              );
            })}
          </div>

          {errors.otp1 && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errors.otp1.message}
            </p>
          )}

          <div className="text-sm text-gray-500 mb-8">
            <p>
              You can request to{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={timer > 0}
                className={`font-medium ${
                  timer === 0
                    ? "text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Resend code
              </button>{" "}
              in 0:{timer.toString().padStart(2, "0")}
            </p>
          </div>

          <button
            type="submit"
            disabled={!allFieldsFilled}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              allFieldsFilled
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
