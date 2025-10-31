


import { useNavigate } from "react-router-dom";
import type { Experience } from "../types/experience";

interface Props {
  exp: Experience;
}

export default function ExperienceCard({ exp }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${exp._id}`, { state: exp })}
      className="bg-white border rounded-xl shadow-sm hover:shadow-md cursor-pointer overflow-hidden transition-all duration-200"
    >
      <img
        src={exp.image}
        alt={exp.title}
        className="w-full h-30 object-cover"
      />

      <div className="p-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm">{exp.title}</h3>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
            {exp.location}
          </span>
        </div>

        <p className="text-gray-500 text-xs mt-1">
          Curated small-group experience. Certified guide.
        </p>

        <div className="flex justify-between items-center mt-3">
          <p className="text-sm font-semibold">From ₹{exp.price}</p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-xs font-semibold px-3 py-1 rounded">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
