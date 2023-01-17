import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { FaTimes } from "react-icons/fa";
import axios from "../api/axios";
import SearchResult from "./SearchResult";
import Loading from "./Loading";
const Search = ({ handleSearchBar }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const debouncedSearch = useDebounce(search);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleClearSearch = () => setSearch("");

  useEffect(() => {
    //Fetch result
    setSearchResult([]);
    const fetchQueryResults = async () => {
      const results = [];
      const { data } = await axios.get(
        `search?hasImages=true&q=${debouncedSearch}`
      );
      for (const id of data.objectIDs.slice(0, 20)) {
        const { data: result } = await axios.get(`objects/${id}`);
        results.push(result);
      }

      setSearchResult(results);
    };

    if (debouncedSearch) {
      fetchQueryResults();
    }

    if (!search) setSearchResult([]);
  }, [debouncedSearch]);

  return (
    <form role="search" className="w-full flex gap-2">
      {/* <label className='absolute left-[10000px]'>Search here</label> */}
      <input
        value={search}
        onChange={handleSearch}
        role="searchbox"
        className="bg-transparent flex-1"
        placeholder="Search here"
        type="text"
      />
      {search && (
        <button
          onClick={handleClearSearch}
          title="Clear search"
          className="text-lg"
        >
          <FaTimes />
        </button>
      )}
      <button
        title="Close"
        testid="closeSearchBar"
        onClick={handleSearchBar}
        className="text-xl"
      >
        <FaTimes />
      </button>
      {search && (
        <div
          role="list"
          className="p-4 absolute right-0 z-50 bg-white shadow-2xl w-full top-[100%] mt-2 flex flex-col gap-2 h-[400px] overflow-y-auto"
        >
          {searchResult.length > 0 ? (
            searchResult.map((article) => (
              <SearchResult
                onClick={handleSearchBar}
                key={article?.objectID}
                article={article}
              />
            ))
          ) : (
            <p>
              <Loading title="Fetching articles" />
            </p>
          )}
        </div>
      )}
    </form>
  );
};

export default Search;
