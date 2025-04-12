import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex items-center gap-3">
      {/* Search Icon Button */}
      <button
        className="text-gray-800 hover:text-black transition"
        onClick={() => setShowSearch(!showSearch)}
      >
        <Search size={20} />
      </button>

      {/* Search Input Box (Toggles On/Off) */}
      {showSearch && (
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-lg px-3 py-1 w-48 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default SearchBar;
