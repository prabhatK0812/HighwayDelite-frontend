
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import logo from "/logo.svg.avif";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?search=${search.trim()}`);
    setSearch("");
  };

  return (
    <nav className="flex justify-between items-center px-10 py-4 border-b">
      <Link to="/">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src={logo} alt="logo" className="h-8" />
          <span className="font-bold text-lg text-gray-700">highway delite</span>
        </div>
      </Link>

      <form
        onSubmit={handleSearch}
        className="flex items-center border rounded-lg overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search experiences"
          className="px-4 py-2 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-400 px-4 py-2 font-semibold hover:bg-yellow-500"
        >
          Search
        </button>
      </form>
    </nav>
  );
}
