
import { useLocation, Link } from "react-router-dom";

export default function Confirmation() {
  const { state } = useLocation() as { state: any };

  const { name, total, promo, discount } = state || {};

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 text-center px-6 pt-20">
      {/* Success Tick Circle */}
      <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full mb-6 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl font-semibold mb-2 text-gray-800">
        Booking Confirmed!
      </h2>

      {/* Personalized Thank You */}
      {name && (
        <p className="text-gray-700 mb-1 text-lg">
          Thank you, <span className="font-semibold">{name}</span> 🎉
        </p>
      )}

      {/* Discount Message */}
      {promo && discount ? (
        <p className="text-green-600 mb-2 font-medium">
          You saved ₹{discount} with promo code <span className="uppercase">{promo}</span> 🎁
        </p>
      ) : (
        <p className="text-gray-500 mb-2">Your booking was successful!</p>
      )}

      {/* Total Summary */}
      <p className="text-gray-600 mb-6">
        Total Paid: <span className="font-semibold text-gray-800">₹{total || "N/A"}</span>
      </p>

      {/* Booking ID */}
      <p className="text-gray-500 mb-8">
        Booking ID: <span className="font-medium text-gray-800">{state?._id || "N/A"}</span>
      </p>

      {/* Back Button */}
      <Link
        to="/"
        className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-lg font-semibold transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
