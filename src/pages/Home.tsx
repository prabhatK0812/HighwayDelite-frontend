

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExperienceCard from "../components/ExperienceCard";
import Loader from "../components/Loader";
import type { Experience } from "../types/experience";

export default function Home() {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("search")?.toLowerCase() || "";

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/experiences");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Scroll to top when search changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search]);

  if (loading) return <Loader />;

  // Search filter logic
  const filtered = query
    ? data.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
      )
    : data;

  return (
    <div className="px-20 py-18">
      {query && (
        <p className="text-gray-500 mb-4">
          Showing results for:{" "}
          <span className="font-semibold">{query}</span>
        </p>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No results found 😔</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.slice(0, 8).map((exp) => (
            <ExperienceCard key={exp._id} exp={exp} />
          ))}
        </div>
      )}
    </div>
  );
}
