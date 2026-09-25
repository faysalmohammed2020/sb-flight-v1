"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Mail,
  Lock,
  EyeOff,
  Eye,
  ArrowRight,
  Plane,
  ShieldCheck,
  Headphones,
  BadgeCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleLogin() {
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#B8E1F5] via-[#D6EEFA] to-[#A8D8F0] p-4 sm:p-6">
      {/* ===== Background clouds ===== */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[500px] w-[500px] rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[500px] w-[500px] rounded-full bg-white/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-10 h-40 w-72 rounded-full bg-white/40 blur-3xl" />

      {/* ===== Dashed plane path (top-left decoration) ===== */}
      <svg
        className="pointer-events-none absolute left-0 top-0 h-full w-2/3 opacity-60"
        viewBox="0 0 800 400"
        fill="none"
      >
        <path
          d="M -20 120 Q 200 40 400 100 T 800 60"
          stroke="#239CC0"
          strokeWidth="2"
          strokeDasharray="5 7"
          opacity="0.5"
        />
      </svg>

      {/* ===== Top-right airplane decoration ===== */}
      <Plane
        size={36}
        className="pointer-events-none absolute right-16 top-10 rotate-[20deg] text-[#239CC0]/70"
        strokeWidth={1.5}
      />

      {/* ===== MAIN CARD ===== */}
      <div className="relative z-10 grid w-full max-w-[1200px] overflow-hidden rounded-[32px] bg-white shadow-[0_30px_90px_-25px_rgba(35,156,192,0.5)] md:grid-cols-[1.05fr_1fr]">
        {/* ================= LEFT — FORM ================= */}
        <div className="relative bg-white p-8 sm:p-10 md:p-12">
          {/* Dashed swirl deco (bottom-left) */}
          <svg
            className="pointer-events-none absolute bottom-4 left-2 h-32 w-40 opacity-40"
            viewBox="0 0 200 100"
            fill="none"
          >
            <path
              d="M 0 80 Q 40 60 80 80 T 160 70"
              stroke="#239CC0"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            <circle cx="80" cy="80" r="3" fill="#239CC0" opacity="0.4" />
            <circle cx="160" cy="70" r="2" fill="#239CC0" opacity="0.3" />
          </svg>

          {/* Logo */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative h-[88px] w-[130px]">
              <Image
                src="/logo.png"
                alt="SB Flight — Touch the Sky"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-[30px] font-extrabold leading-tight">
              <span className="text-[#0B2545]">Welcome </span>
              <span className="text-[#239CC0]">Back</span>
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-500">
              Login to your SB Flight account and
              <br className="hidden sm:block" /> continue your journey.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">
                !
              </span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="group relative">
              <Mail
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#239CC0]"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-[52px] w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-[14px] text-[#0B2545] outline-none transition-all placeholder:text-slate-400 focus:border-[#239CC0] focus:ring-4 focus:ring-[#239CC0]/10"
              />
            </div>

            {/* Password */}
            <div className="group relative">
              <Lock
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#239CC0]"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[52px] w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-[14px] text-[#0B2545] outline-none transition-all placeholder:text-slate-400 focus:border-[#239CC0] focus:ring-4 focus:ring-[#239CC0]/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-[#239CC0]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
              </button>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-slate-600">
                <span
                  onClick={() => setRemember((v) => !v)}
                  className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] transition-all ${
                    remember
                      ? "border-2 border-[#239CC0] bg-[#239CC0]"
                      : "border-2 border-slate-300 bg-white"
                  }`}
                >
                  {remember && (
                    <svg viewBox="0 0 12 12" className="h-3 w-3 fill-white">
                      <path d="M4.5 8.5L2 6l.9-.9L4.5 6.7 9.1 2l.9.9z" />
                    </svg>
                  )}
                </span>
                Remember me
              </label>

              <a
                href="/forgot-password"
                className="text-[13px] font-semibold text-[#239CC0] transition-colors hover:text-[#087EA3]"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#239CC0] to-[#0F7FA5] text-[15px] font-bold text-white shadow-[0_10px_25px_-8px_rgba(35,156,192,0.8)] transition-all hover:shadow-[0_14px_32px_-8px_rgba(35,156,192,1)] disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Login"}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[12px] text-slate-400">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-[52px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-[14px] font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20.5H24v7h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5-5C33.5 7.4 29 5.5 24 5.5 13.8 5.5 5.5 13.8 5.5 24S13.8 42.5 24 42.5 42.5 34.2 42.5 24c0-1.2-.1-2.3-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M7.3 14.7l5.7 4.2C14.7 15.1 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5-5C33.5 7.4 29 5.5 24 5.5c-7.6 0-14.2 4.3-17.6 10.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 42.5c5 0 9.5-1.9 12.9-5l-6-5c-2 1.5-4.4 2.4-6.9 2.4-5.2 0-9.6-3.1-11.2-7.6l-5.7 4.4C10.5 38.5 16.8 42.5 24 42.5z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20.5H24v7h11.3c-.8 2.3-2.2 4.3-4.1 5.6l6 5c-.4.4 6.3-4.6 6.3-14.1 0-1.2-.1-2.3-.4-3.5z"
              />
            </svg>
            Login with Google
          </button>

          {/* Sign up */}
          <p className="mt-6 text-center text-[13px] text-slate-500">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-[#239CC0] hover:text-[#087EA3]"
            >
              Sign Up
            </a>
          </p>
        </div>

        {/* ================= RIGHT — ILLUSTRATION ================= */}
        <div className="relative hidden min-h-[720px] overflow-hidden bg-gradient-to-b from-[#5BC0E8] via-[#4CB0E0] to-[#8FD4EE] md:block">
          {/* Cloud layer */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-10 top-32 h-24 w-48 rounded-full bg-white/50 blur-2xl" />
            <div className="absolute right-10 top-56 h-20 w-40 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute bottom-32 left-1/3 h-24 w-56 rounded-full bg-white/40 blur-2xl" />
          </div>

          {/* Curved top-right of card (image corner) */}
          <div className="relative h-full w-full">
            {/* Illustration - replace with your airport illustration image */}
            <Image
              src="/login-image.png"
              alt="Traveler at airport with SB Flight"
              fill
              className="cover"
              priority
            />

            {/* Subtle blue tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#239CC0]/10 via-transparent to-[#0F7FA5]/20" />
          </div>

          {/* Plane trail deco */}
          <svg
            className="pointer-events-none absolute right-0 top-40 h-24 w-40 opacity-90"
            viewBox="0 0 200 100"
            fill="none"
          >
            <path
              d="M 0 90 Q 80 60 200 10"
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              opacity="0.7"
            />
          </svg>
          <Plane
            size={26}
            className="pointer-events-none absolute -right-2 top-32 rotate-[35deg] fill-white text-white drop-shadow-lg"
          />
        </div>
      </div>

      {/* ===== Bottom-right floating palm decoration ===== */}
      <div className="pointer-events-none absolute -bottom-6 right-4 hidden opacity-90 md:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="105" rx="30" ry="8" fill="#0B6E4F" opacity="0.3" />
          <path
            d="M 60 100 Q 60 60 55 30"
            stroke="#0B6E4F"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 55 30 Q 20 20 5 45 Q 30 40 55 30 Z"
            fill="#0B6E4F"
          />
          <path
            d="M 55 30 Q 30 5 15 5 Q 35 20 55 30 Z"
            fill="#0B6E4F"
          />
          <path
            d="M 55 30 Q 90 15 105 30 Q 80 32 55 30 Z"
            fill="#0B6E4F"
          />
          <path
            d="M 55 30 Q 95 40 105 60 Q 75 45 55 30 Z"
            fill="#0B6E4F"
          />
        </svg>
      </div>
    </div>
  );
}