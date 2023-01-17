import { useEffect, useState } from "react";
import axios from "../api/axios";
import Article from "../components/Article";
import Loading from "../components/Loading";

const MainPage = () => {
  const [allArticles, setAllArticles] = useState(null);
  useEffect(() => {
    const fetchArticles = async () => {
      const articles = [];
      const { data: IDs } = await axios.get("search?isHighlight=true&q=a");
      for (const id of IDs.objectIDs.slice(0, 30)) {
        const { data } = await axios.get(`objects/${id}`);
        data.primaryImage && articles.push(data);
      }

      setAllArticles(articles);
    };

    fetchArticles();
  }, []);

  return (
    <main className="p-4">
      <h3 className="text-xl font-semibold my-4">Highlighted Articles</h3>
      {!allArticles ? (
        <p>
          <Loading title="Fetching articles" />
        </p>
      ) : allArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-8">
            {allArticles.slice(0, allArticles.length / 3).map((article) => (
              <Article key={article?.objectID} article={article} />
            ))}
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            {allArticles
              .slice(allArticles.length / 3, (2 * allArticles.length) / 3)
              .map((article) => (
                <Article key={article?.objectID} article={article} />
              ))}
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            {allArticles
              .slice((2 * allArticles.length) / 3, allArticles.length)
              .map((article) => (
                <Article key={article?.objectID} article={article} />
              ))}
          </div>
        </div>
      ) : (
        <p>No articles match</p>
      )}
    </main>
  );
};

export default MainPage;
