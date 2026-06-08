"use client";

import { useState } from "react";
import "../globals.css";

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);

  const subscribe = async () => {
    setLoading(true);

    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    }

    setLoading(false);
  };

  return (
      <>
        <div className="max-w-5xl mx-auto py-20 px-4">
          <h1 className="text-4xl font-bold text-center mb-10">
            Choose Your Plan
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="rounded-lg border p-8 shadow">
              <h2 className="text-2xl font-semibold">Free</h2>

              <p className="text-4xl font-bold mt-4">
                $0
                <span className="text-lg font-normal">/month</span>
              </p>

              <ul className="mt-6 space-y-2">
                <li>✓ Public post viewing</li>
                <li>✓ Post listing and search</li>
                <li>✓ Simple navigation</li>
              </ul>

              <button
                  disabled
                  className="w-full mt-8 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700"
              >
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="rounded-lg border p-8 shadow border-blue-500">
              <h2 className="text-2xl font-semibold">Pro Plan</h2>

              <p className="text-4xl font-bold mt-4">
                $9.99
                <span className="text-lg font-normal">/month</span>
              </p>

              <ul className="mt-6 space-y-2">
                <li>✓ Protected premium content</li>
                <li>✓ Subscription system</li>
                <li>✓ Enhanced user experience</li>
              </ul>

              <button
                  onClick={subscribe}
                  disabled={loading}
                  className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Redirecting..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </>
  );
}
