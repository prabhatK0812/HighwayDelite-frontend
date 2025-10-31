













// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
// import { dummyData } from "../data/dummyData";
// import type { Experience } from "../types/experience";
// import SlotButton from "../components/SlotButton";

// export default function Details() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const state = location.state as Experience | undefined;

//   const exp = state || dummyData.find((e) => e._id === id);
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [selectedTime, setSelectedTime] = useState<string>("");
//   const [quantity, setQuantity] = useState(1);

//   if (!exp)
//     return (
//       <p className="p-10 text-center text-red-500">Experience not found!</p>
//     );

//   // Generate next 5 days
//   const getNext5Days = () => {
//     const days: string[] = [];
//     for (let i = 0; i < 5; i++) {
//       const d = new Date();
//       d.setDate(d.getDate() + i);
//       days.push(d.toDateString().slice(4, 10)); // e.g. "Oct 22"
//     }
//     return days;
//   };

//   const dates = getNext5Days();

//   const times = [
//     { label: "07:00 am", left: 4 },
//     { label: "09:00 am", left: 2 },
//     { label: "11:00 am", left: 5 },
//     { label: "01:00 pm", left: 0 },
//   ];

//   const tax = 0.06; // 6%
//   const subtotal = exp.price * quantity;
//   const total = subtotal + subtotal * tax;

//   const handleConfirm = () => {
//     if (!selectedDate || !selectedTime)
//       return alert("Please select a date and time!");
//     navigate("/checkout", {
//       state: { ...exp, date: selectedDate, time: selectedTime, quantity },
//     });
//   };

//   return (
//     <div className="p-10 grid lg:grid-cols-3 gap-10">
//       {/* Left Content */}
//       <div className="lg:col-span-2">

//           {/* Back + Title */}
//           <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate("/")}>
//             <span className="text-gray-600 text-sm">←</span>
//             <span className="text-gray-650 font-medium">Details</span>
//           </div>
        
        
//         <img
//           src={exp.image}
//           alt={exp.title}
//           className="rounded-xl w-full h-96 object-cover"
//         />


//         <h2 className="text-3xl font-semibold mt-6">{exp.title}</h2>
//         <p className="mt-3 text-gray-600">{exp.description}</p>

//         {/* Date selection */}
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Choose date</h3>
//           <div className="flex gap-2 flex-wrap">
//             {dates.map((d) => (
//               <SlotButton
//                 key={d}
//                 label={d}
//                 selected={selectedDate === d}
//                 onClick={() => setSelectedDate(d)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Time selection */}
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Choose time</h3>
//           <div className="flex gap-2 flex-wrap">
//             {times.map((t) => (
//               <div key={t.label} className="relative">
//                 <SlotButton
//                   label={t.label}
//                   selected={selectedTime === t.label}
//                   onClick={() => setSelectedTime(t.label)}
//                   disabled={t.left === 0}
//                   small
//                 />
//                 {t.left > 0 ? (
//                   <span className="absolute text-xs text-red-500 -bottom-5 left-2">
//                     {t.left} left
//                   </span>
//                 ) : (
//                   <span className="absolute text-xs text-gray-400 -bottom-5 left-2">
//                     Sold out
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* About section */}
//         {/* <div className="mt-10 text-gray-600 text-sm border-t pt-4">
//           Scenic routes, trained guides, and safety briefing. Minimum age 10.
//         </div> */}

//                   {/* About Section */}
//           <div className="mt-8">
//             <h3 className="text-gray-700 font-medium mb-2">About</h3>
//             <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3">
//               Scenic routes, trained guides, and safety briefing. Minimum age 10.
//             </p>
//           </div>
//       </div>

//       {/* Right Sidebar Summary */}
//       <div className="bg-gray-50 border rounded-xl p-6 h-fit mt-12">
//         <div className="flex justify-between mb-2">
//           <span className="text-gray-500">Starts at</span>
//           <span className="font-semibold">₹{exp.price}</span>
//         </div>

//         <div className="flex justify-between mb-2 items-center">
//           <span className="text-gray-500">Quantity</span>
//           <div className="flex items-center gap-2">
//             <button
//               className="border px-2 rounded"
//               onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//             >
//               −
//             </button>
//             <span>{quantity}</span>
//             <button
//               className="border px-2 rounded"
//               onClick={() => setQuantity((q) => q + 1)}
//             >
//               +
//             </button>
//           </div>
//         </div>

//         <div className="flex justify-between text-gray-500 mb-1">
//           <span>Subtotal</span>
//           <span>₹{subtotal}</span>
//         </div>
//         <div className="flex justify-between text-gray-500 mb-1">
//           <span>Taxes</span>
//           <span>₹{(subtotal * tax).toFixed(0)}</span>
//         </div>

//         <div className="flex justify-between font-semibold text-lg mt-2">
//           <span>Total</span>
//           <span>₹{total.toFixed(0)}</span>
//         </div>

//         <button
//           onClick={handleConfirm}
//           className="bg-yellow-400 w-full mt-6 py-2 rounded-lg font-semibold hover:bg-yellow-500"
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// }




import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Experience } from "../types/experience";
import SlotButton from "../components/SlotButton";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as Experience | undefined;

  const [exp, setExp] = useState<Experience | null>(state || null);
  const [loading, setLoading] = useState(!state);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ✅ Fetch data from backend only if not passed via state
  useEffect(() => {
    if (!exp && id) {
      fetch(`http://localhost:5000/api/experiences/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setExp(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p className="p-10 text-center text-gray-500">Loading...</p>;
  if (!exp)
    return <p className="p-10 text-center text-red-500">Experience not found!</p>;

  // Generate next 5 days
  const getNext5Days = () => {
    const days: string[] = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d.toDateString().slice(4, 10)); // e.g. "Oct 22"
    }
    return days;
  };

  const dates = getNext5Days();

  const times = [
    { label: "07:00 am", left: 4 },
    { label: "09:00 am", left: 2 },
    { label: "11:00 am", left: 5 },
    { label: "01:00 pm", left: 0 },
  ];

  const tax = 0.06; // 6%
  const subtotal = exp.price * quantity;
  const total = subtotal + subtotal * tax;

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime)
      return alert("Please select a date and time!");
    navigate("/checkout", {
      state: { ...exp, date: selectedDate, time: selectedTime, quantity },
    });
  };

  return (
    <div className="p-10 grid lg:grid-cols-3 gap-10">
      {/* Left Content */}
      <div className="lg:col-span-2">
        {/* Back + Title */}
        <div
          className="flex items-center gap-2 mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-gray-600 text-sm">🡨</span>
          <span className="text-gray-650 font-medium">Details</span>
        </div>

        <img
          src={exp.image}
          alt={exp.title}
          className="rounded-xl w-full h-90 object-cover"
        />

        <h2 className="text-3xl font-semibold mt-6">{exp.title}</h2>
        <p className="mt-3 text-gray-600">{exp.description}</p>

        {/* Date selection */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Choose date</h3>
          <div className="flex gap-2 flex-wrap">
            {dates.map((d) => (
              <SlotButton
                key={d}
                label={d}
                selected={selectedDate === d}
                onClick={() => setSelectedDate(d)}
              />
            ))}
          </div>
        </div>

        {/* Time selection */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Choose time</h3>
          <div className="flex gap-2 flex-wrap">
            {times.map((t) => (
              <div key={t.label} className="relative">
                <SlotButton
                  label={t.label}
                  selected={selectedTime === t.label}
                  onClick={() => setSelectedTime(t.label)}
                  disabled={t.left === 0}
                  small
                />
                {t.left > 0 ? (
                  <span className="absolute text-xs text-red-500 -bottom-5 left-2">
                    {t.left} left
                  </span>
                ) : (
                  <span className="absolute text-xs text-gray-400 -bottom-5 left-2">
                    Sold out
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <h3 className="text-gray-700 font-medium mb-2">About</h3>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>
      </div>

      {/* Right Sidebar Summary */}
      <div className="bg-gray-50 border rounded-xl p-6 h-fit mt-12">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Starts at</span>
          <span className="font-semibold">₹{exp.price}</span>
        </div>

        <div className="flex justify-between mb-2 items-center">
          <span className="text-gray-500">Quantity</span>
          <div className="flex items-center gap-2">
            <button
              className="border px-2 rounded"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              className="border px-2 rounded"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between text-gray-500 mb-1">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-500 mb-1">
          <span>Taxes</span>
          <span>₹{(subtotal * tax).toFixed(0)}</span>
        </div>

        <div className="flex justify-between font-semibold text-lg mt-2">
          <span>Total</span>
          <span>₹{total.toFixed(0)}</span>
        </div>

        <button
          onClick={handleConfirm}
          className="bg-yellow-400 w-full mt-6 py-2 rounded-lg font-semibold hover:bg-yellow-500"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
