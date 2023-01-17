import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ article, onClick }) => {
  return (
    <div onClick={onClick} className="flex gap-2 items-center">
      <div className="rounded-full overflow-hidden h-16 w-16">
        <img
          src={
            article?.primaryImage ||
            article?.primaryImageSmall ||
            "https://clipground.com/images/loading-png-10.png"
          }
          alt={article?.title}
          className="object-fill"
        />
      </div>
      <Link to={`/${article?.objectID}`}>
        <p className="text-lg cursor-pointer">{article?.title}</p>
      </Link>
    </div>
  );
};

export default SearchResult;
