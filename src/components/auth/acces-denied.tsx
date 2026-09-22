import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AccessDenied() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-red-100 sm:size-24">
          <ShieldAlert
            className="size-10 text-red-500 sm:size-12"
            strokeWidth={1.8}
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Access Denied
          </h1>

          <p className="mx-auto max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
            You do not have permission to access this page. Please go back to
            the home page and continue browsing.
          </p>
        </div>

        {/* Action */}
        <div className="mt-7">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
