"use client";

import { useState } from "react";

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
    <div className="max-w-5xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Choose Your Plan
      </h1>

      <div className="max-w-md mx-auto rounded-lg border p-8 shadow">
        <h2 className="text-2xl font-semibold">Pro Plan</h2>

        <p className="text-4xl font-bold mt-4">
          $9.99
          <span className="text-lg font-normal">/month</span>
        </p>

        <ul className="mt-6 space-y-2">
          <li>✓ Unlimited stories</li>
          <li>✓ AI-powered content</li>
          <li>✓ Premium templates</li>
          <li>✓ Priority support</li>
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
  );
}