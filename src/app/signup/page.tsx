'use client';
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
      setIsPending(false);
    } else {
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    }
  };
  const handleGooglesignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleGithubsignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl w-full max-w-md p-6 sm:p-8 text-left">
        <form onSubmit={onSubmit} className="space-y-5" action="#" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none block w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 sm:text-sm transition-colors bg-white"
              placeholder="যেমন: রহিম উদ্দিন"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 sm:text-sm transition-colors bg-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none block w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 sm:text-sm transition-colors bg-white"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none block w-full px-3 py-2.5 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 sm:text-sm transition-colors bg-white"
              placeholder="আবার লিখুন"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center">
            <div className="w-full border-t border-gray-200"></div>
            <div className="px-4 text-xs font-medium text-gray-500 bg-white">অথবা</div>
            <div className="w-full border-t border-gray-200"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button
              type="button"
              onClick={handleGooglesignIn}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors"
            >
              <FcGoogle className="w-4 h-4" />
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              type="button"
              onClick={handleGithubsignIn}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:text-green-800 transition-colors"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          &larr; হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
