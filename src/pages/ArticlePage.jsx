import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import wikipediaAxios from "axios";
import { BsStar, BsStarFill } from "react-icons/bs";
const ArticlePage = () => {
  const [article, setArticle] = useState(null);
  const [wikipediaResult, setWikipediaResult] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const fetchInfoWikipedia = async (searchTerm) => {
    const encodedTitle = encodeURI(searchTerm);
    const { data } = await wikipediaAxios.get(
      `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodedTitle}&gsrlimit=20&prop=pageimages|extracts&exintro&explaintext&exlimit=max&format=json&origin=*`
    );

    //Get first article
    if (data.query.pages) {
      const firstResult =
        data.query.pages[Object.keys(data.query.pages).slice(0, 1).join("")];
      setWikipediaResult(firstResult);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`objects/${params?.id}`);
        if (!data) {
          navigate("/");
        }
        setArticle(data);
        console.log({ data });
        fetchInfoWikipedia(data?.title);
      } catch (err) {
        console.error(err);
        if (err.response.status === 400) {
          navigate("/404");
        }
      }
    };

    fetchArticle();
  }, [params?.id]);
  return (
    <main className="mt-4">
      {article ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <p className="text-xl">
              {article.isHighlight ? <BsStarFill color="green" /> : <BsStar />}
            </p>
            <h2 className="font-semibold text-xl">{article?.title}</h2>
          </div>
          <h3 className="text-xl font-semibold">Related Information</h3>
          <div className="grid grid-cols-1 gap-2 p-2  text-lg">
            {article?.country && (
              <p>
                <span className="font-semibold">Country:</span>{" "}
                {article?.country}
              </p>
            )}
            {article?.city && (
              <p>
                <span className="font-semibold">City:</span> {article?.city}
              </p>
            )}
            {article?.region && (
              <p>
                <span className="font-semibold">Region:</span> {article?.region}
              </p>
            )}
            {article?.subRegion && (
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {article?.subRegion}
              </p>
            )}
            {article?.creditLine && (
              <p>
                <span className="font-semibold">Credit Line:</span>{" "}
                {article?.creditLine}
              </p>
            )}
            {article?.accessionYear && (
              <p>
                <span className="font-semibold">Accession Year:</span>{" "}
                {article?.accessionYear}
              </p>
            )}
            {article?.period && (
              <p>
                <span className="font-semibold">Period:</span> {article?.period}
              </p>
            )}
            {article?.department && (
              <p>
                <span className="font-semibold">Department:</span>{" "}
                {article?.department}
              </p>
            )}
            {article?.culture && (
              <p>
                <span className="font-semibold">Culture:</span>{" "}
                {article?.culture}
              </p>
            )}
            {article?.dynasty && (
              <p>
                <span className="font-semibold">Dynasty:</span>{" "}
                {article?.dynasty}
              </p>
            )}
            {article?.classification && (
              <p>
                <span className="font-semibold">Classification:</span>{" "}
                {article?.classification}
              </p>
            )}
            {article?.repository && (
              <p>
                <span className="font-semibold">Repository:</span>{" "}
                {article?.repository}
              </p>
            )}
            {article?.portfolio && (
              <p>
                <span className="font-semibold">Portfolio:</span>{" "}
                {article?.portfolio}
              </p>
            )}
            {article?.dimensions && (
              <p>
                <span className="font-semibold">Dimensions:</span>{" "}
                {article?.dimensions}
              </p>
            )}
            {article?.primaryImage && (
              <img src={article?.primaryImage} alt={article?.title} />
            )}
            {article?.additionalImages?.map((image, index) => (
              <img src={image} alt={article?.title} key={index} />
            ))}
          </div>
          <h3 className="text-xl font-semibold">Artists</h3>
          <div className="grid grid-cols-1 gap-2 p-2  text-lg">
            {article?.artistRole && (
              <p>
                <span className="font-semibold">Artist Role:</span>{" "}
                {article?.artistRole}
              </p>
            )}
            {article?.artistDisplayName && (
              <p>
                <span className="font-semibold">Artist Name:</span>{" "}
                {article?.artistDisplayName}
              </p>
            )}
            {article?.artistDisplayBio && (
              <p>
                <span className="font-semibold">Artist Bio:</span>{" "}
                {article?.artistDisplayBio}
              </p>
            )}
            {article?.artistNationality && (
              <p>
                <span className="font-semibold">Artist Nationality:</span>{" "}
                {article?.artistNationality}
              </p>
            )}
            {article?.artistGender && (
              <p>
                <span className="font-semibold">Artist Gender:</span>{" "}
                {article?.artistGender}
              </p>
            )}
            {article?.artistBeginDate && (
              <p>
                <span className="font-semibold">Artist Born Date:</span>{" "}
                {article?.artistBeginDate}
              </p>
            )}
            {article?.artistEndDate && (
              <p>
                <span className="font-semibold">Artist Death Date:</span>{" "}
                {article?.artistEndDate}
              </p>
            )}
            {article?.artistWikidata_URL && (
              <p>
                <span className="font-semibold">Artist Wikipedia Link:</span>{" "}
                <a
                  href={article?.artistWikidata_URL}
                  className="underline underline-offset-2"
                >
                  Click here
                </a>
              </p>
            )}
          </div>
          <h3 className="text-xl font-semibold">Results from Wikipedia</h3>
          {wikipediaResult && (
            <div className="flex flex-col gap-2">
              <a href={article?.objectWikidata_URL ?? "/"} target="_blank">
                <img
                  width={wikipediaResult.thumbnail.width}
                  height={wikipediaResult.thumbnail.height}
                  src={wikipediaResult.thumbnail.source}
                  className="object-cover"
                  alt={wikipediaResult?.title}
                />
              </a>
              <a
                href={article?.objectWikidata_URL ?? "/"}
                target="_blank"
                className="underline"
              >
                Read in Wikipedia
              </a>
              <p>{wikipediaResult.extract}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default ArticlePage;
