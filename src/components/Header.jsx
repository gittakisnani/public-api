import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Search from "./Search";

const Header = () => {
  const [searchBar, setSearchBar] = useState(false);
  const handleSearchBar = () => setSearchBar(!searchBar);
  return (
    <header role="contentinfo" className="flex gap-2 items-center">
      {!searchBar && (
        <nav className="flex gap-4 items-center flex-grow justify-end">
          <button role="button" onClick={handleSearchBar} className="text-xl">
            <FiSearch />
          </button>
          <Link to="/">
            <p className="text-lg font-semibold">Home</p>
          </Link>
          <Link to="/advanced-search">
            <p className="text-lg font-semibold">Advanced search</p>
          </Link>
        </nav>
      )}
      {searchBar && <Search handleSearchBar={handleSearchBar} />}
    </header>
  );
};

export default Header;
