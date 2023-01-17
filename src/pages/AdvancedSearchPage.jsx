import { useEffect, useRef, useState } from "react";
import { AiFillFilter } from "react-icons/ai";
import AdvancedFilters from "../components/AdvancedFilters";
import { GrSearch } from "react-icons/gr";
import axios from "../api/axios";
import Article from "../components/Article";

const AdvancedSearchPage = () => {
  const [filters, setFilters] = useState();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef();

  const [advancedFilters, setAdvancedFilters] = useState({
    isHighlight: false,
    isPublicDomain: true,
    hasImages: true,
    isOnView: true,
    dateBegin: "",
    dateEnd: "",
    departmentId: "",
    medium: "",
    geoLocation: "",
  });

  const handleShowFilters = () => setFilters(!filters);

  const handleFilters = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setAdvancedFilters({ ...advancedFilters, [name]: checked });
    } else setAdvancedFilters({ ...advancedFilters, [name]: value });
  };

  const buildRequestUrl = () => {
    return Object.entries(advancedFilters)
      .filter(([key, value]) => key !== "medium")
      .map(([key, value]) => (value ? `${key}=${value}&` : ""))
      .join("");
  };

  const fetchArticles = async (e) => {
    e.preventDefault();
    const articlesArray = [];
    try {
      setLoading(true);
      const { data: IDs } = await axios.get(
        `search?${
          advancedFilters.medium
            ? `medium=${advancedFilters.medium.trim().replaceAll(/\s+/g, "|")}&`
            : ""
        }${buildRequestUrl()}q=${searchRef.current.value || "a"}`
      );
      for (const id of IDs.objectIDs.slice(0, 20)) {
        const { data: article } = await axios.get(`objects/${id}`);
        articlesArray.push(article);
      }

      setArticles(articlesArray);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setAdvancedFilters({
      isHighlight: false,
      isPublicDomain: true,
      hasImages: true,
      isOnView: true,
      dateBegin: "",
      dateEnd: "",
      departmentId: "",
      medium: "",
      geoLocation: "",
      tags: "",
    });
    setFilters(false);
  };
  return (
    <main className="p-4">
      <header className="">
        <form
          onSubmit={fetchArticles}
          className="border-b relative border-slate-700 flex mb-4 gap-2 items-center "
        >
          <input
            ref={searchRef}
            className="flex-1 bg-transparent p-2"
            placeholder="Search articles here"
            type="text"
          />
          <button className="text-xl" title="Submit">
            <GrSearch />
          </button>
          <button
            type="button"
            className="text-xl"
            title="filters"
            onClick={handleShowFilters}
          >
            <AiFillFilter />
          </button>
          {filters && (
            <AdvancedFilters
              clearFilters={clearFilters}
              advancedFilters={advancedFilters}
              handleAdvancedFilters={handleFilters}
              handleShowFilters={handleShowFilters}
            />
          )}
        </form>
      </header>
      <h2 className="font-semibold text-xl mb-4 ">Articles</h2>
      {articles.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-8">
            {articles.slice(0, articles.length / 3).map((article) => (
              <Article key={article?.objectID} article={article} />
            ))}
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            {articles
              .slice(articles.length / 3, (2 * articles.length) / 3)
              .map((article) => (
                <Article key={article?.objectID} article={article} />
              ))}
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            {articles
              .slice((2 * articles.length) / 3, articles.length)
              .map((article) => (
                <Article key={article?.objectID} article={article} />
              ))}
          </div>
        </div>
      ) : !loading ? (
        "No articles match"
      ) : (
        "Loading..."
      )}
    </main>
  );
};

export default AdvancedSearchPage;
