import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Experience } from "../types/experience";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const exp = location.state as
    | (Experience & { date?: string; time?: string; quantity?: number })
    | undefined;

  if (!exp) {
    navigate("/");
    return null;
  }

  // Basic Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [accepted, setAccepted] = useState(false);

  // Promo & Discount States 
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Calculation
  const subtotal = exp.price * (exp.quantity || 1);
  const tax = Math.round(subtotal * 0.06);
  const total = subtotal + tax - discount;

  // Promo code apply handler 
  const handleApplyPromo = async () => {
    setError("");
    setSuccess("");
    const code = promo.trim().toUpperCase();

    if (!code) {
      setError("Please enter a promo code");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!data.valid) {
        setError("Invalid promo code");
        setDiscount(0);
      } else {
        // Apply discount logic
        if (data.promo.discountFlat)
          setDiscount(data.promo.discountFlat);
        else if (data.promo.discountPercent)
          setDiscount(Math.round((subtotal * data.promo.discountPercent) / 100));

        setSuccess(`Promo applied: ${data.promo.code}`);
      }
    } catch (err) {
      setError("Server error, try again later");
    }
  };



const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!accepted) return alert("Please accept the terms first!");

  // Calculate discount based on promo
  let discount = 0;
  if (promo === "DELITE10") discount = Math.round(total * 0.1);
  else if (promo === "SAVE50") discount = 50;

  // Navigate to Confirmation with full booking info
  navigate("/confirmation", {
    state: {
      ...exp,
      name,
      total: total - discount,
      promo: promo || null,
      discount,
    },
  });
};




  return (
    <div className="p-10 grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
      {/* LEFT SIDE FORM */}
      <div>
        {/* Back Button */}
        <div
          className="flex items-center gap-2 mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-gray-600 text-sm">🡨</span>
          <span className="text-gray-650 font-medium">Checkout</span>
        </div>

        {/* FORM SECTION */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 border rounded-xl p-6"
        >
          {/* Full Name + Email  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Promo code */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code"
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Apply
              </button>
            </div>

            {/* Promo messages */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="w-4 h-4"
            />
            I agree to the terms and safety policy
          </label>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-gray-50 border rounded-xl p-6 h-fit mt-12 w-[85%] mx-auto shadow-md lg:w-[65%]">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Experience</span>
            <span className="font-medium text-black">{exp.title}</span>
          </div>

          {exp.date && (
            <div className="flex justify-between">
              <span>Date</span>
              <span>{exp.date}</span>
            </div>
          )}

          {exp.time && (
            <div className="flex justify-between">
              <span>Time</span>
              <span>{exp.time}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>City</span>
            <span>{exp.location}</span>
          </div>

          <div className="flex justify-between">
            <span>Qty</span>
            <span>{exp.quantity || 1}</span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Taxes</span>
            <span>₹{tax}</span>
          </div>

          {/* Discount Line */}
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-yellow-400 mt-6 w-full py-2 rounded-lg font-semibold hover:bg-yellow-500"
        >
          Pay and Confirm
        </button>
      </div>
    </div>
  );
}





