import { useEffect, useState } from "react";
import axios from "../api/axios";
import Article from "../components/Article";

const MainPage = () => {
  const [allArticles, setAllArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      const articles = [];
      const { data: IDs } = await axios.get("search?isHighlight=true&q=a");
      for (const id of IDs.objectIDs.slice(0, 20)) {
        const { data } = await axios.get(`objects/${id}`);
        articles.push(data);
      }

      setAllArticles(articles);
      console.log(articles);
    };

    fetchArticles();
  }, []);

  return (
    <main className="p-4">
      <h3 className="text-xl font-semibold mb-4">Highlight articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allArticles.length > 0 ? (
          allArticles.map((article) => (
            <Article key={article.objectID} article={article} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default MainPage;
