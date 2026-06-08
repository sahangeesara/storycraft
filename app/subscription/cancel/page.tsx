import "../../globals.css";

export default function CancelPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-red-600">
        Subscription Cancelled
      </h1>

      <p className="mt-4">
        You can subscribe again anytime.
      </p>
    </div>
  );
}
