import { Link } from "react-router-dom";

const Article = ({ article }) => {
  return (
    <div className="bg-white flex flex-col gap-2">
      <Link to={`/${article.objectID}`}>
        <img
          role="img"
          className="w-full max-h-[500px] object-cover"
          src={
            article?.primaryImage ||
            "https://clipground.com/images/loading-png-10.png"
          }
          alt={article?.title}
        />
      </Link>
      <h4 className="text-lg font-semibold">{article?.title}</h4>
      <p>
        by:{" "}
        <span className="font-semibold text-lg">
          {article?.artistDisplayName || "Unknown"} {article?.artistBeginDate}{" "}
          {article?.artistEndDate}
        </span>
      </p>
      <p role="contentinfo">
        {article?.country} {article?.city}
      </p>
    </div>
  );
};

export default Article;
