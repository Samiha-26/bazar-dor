'use client';

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useEffect, type FormEvent } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin?error=unauthorized");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const user = session.user;

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    const { error } = await authClient.updateUser({
      name: name,
    });

    if (error) {
      toast.error(error.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
    } else {
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      router.refresh();
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("লগ আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={64}
                height={64}
                className="rounded-full h-16 w-16 object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl font-bold shrink-0">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div className="flex flex-col text-left">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            লগ আউট
          </button>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">তথ্য</h2>
          
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name || ""}
                className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 transition-colors bg-white text-gray-900"
                placeholder="আপনার নাম"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors"
              >
                আপডেট
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
