'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে লগ আউট হয়েছে!");
          router.push("/");
        }
      }
    });
  };

  if (isPending) {
    return (
      <div className="flex shrink-0 items-center gap-2 text-sm">
        <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="flex items-center gap-2 hover:bg-gray-100 p-1 pr-2 rounded-full transition-colors cursor-pointer">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User avatar'}
              width={32}
              height={32}
              unoptimized
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
              {session.user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {session.user.name || "User"}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box mt-2 w-52 border border-gray-100">
          <li>
            <div className="flex flex-col items-start pointer-events-none pb-2">
              <span className="font-bold text-gray-800">{session.user.name}</span>
              <span className="text-xs text-gray-500">{session.user.email}</span>
            </div>
          </li>
          <div className="divider my-0 h-0"></div>
          <li>
            <Link href="/profile" className="text-gray-700">আমার প্রোফাইল</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="text-red-600 font-medium hover:bg-red-50 focus:bg-red-50 active:bg-red-50">
              লগ আউট
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2 text-sm">
      <Link href="/signin" className="btn btn-active bg-white transition-colors hover:bg-gray-300 px-4 py-2 rounded-md">
        সাইন ইন
      </Link>
      <Link href="/signup" className="btn btn-active bg-green-700 hover:bg-green-800 transition-colors px-4 py-2 text-white rounded-md">
        সাইন আপ
      </Link>
    </div>
  );
}
