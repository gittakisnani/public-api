import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import wikipediaAxios from "axios";
import { BsStar, BsStarFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import ImageGrid from "../components/ImageGrid";
import Title from "../components/Title";
import InfoItem from "../components/InfoItem";
import Loading from "../components/Loading";
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
    <main className="p-4">
      {article ? (
        <>
          <div className="gap-1 flex font-semibold mb-2 items-center">
            <Link to="/">
              <p>Home</p>
            </Link>
            <span className="mt-0.5 text-lg">
              <IoIosArrowForward />
            </span>
            <Link to={`/${params?.id}`}>
              <p>{article?.title}</p>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-4">
              {article?.primaryImage && (
                <ImageGrid
                  primaryImage={article?.primaryImage}
                  additionalImages={article?.additionalImages}
                  title={article?.title}
                />
              )}
              <div>
                <div className="grid grid-cols-1 gap-2 p-2 text-lg">
                  <Title
                    title={article?.title}
                    isHighlight={article?.isHighlight}
                  />
                  <h3 className="text-2xl font-semibold">
                    Related Information
                  </h3>
                  {article?.country && (
                    <InfoItem item="Country" value={article?.country} />
                  )}
                  {article?.city && (
                    <InfoItem item="City" value={article?.city} />
                  )}
                  {article?.region && (
                    <InfoItem item="Region" value={article?.region} />
                  )}
                  {article?.subRegion && (
                    <InfoItem item="Sub Region" value={article?.subRegion} />
                  )}
                  {article?.creditLine && (
                    <InfoItem item="Credit Line" value={article?.creditLine} />
                  )}
                  {article?.accessionYear && (
                    <InfoItem
                      item="Accession Year"
                      value={article?.accessionYear}
                    />
                  )}
                  {article?.period && (
                    <InfoItem item="Period" value={article?.period} />
                  )}
                  {article?.department && (
                    <InfoItem item="Department" value={article?.department} />
                  )}
                  {article?.culture && (
                    <InfoItem item="Culture" value={article?.culture} />
                  )}
                  {article?.dynasty && (
                    <InfoItem item="Dynasty" value={article?.dynasty} />
                  )}
                  {article?.classification && (
                    <InfoItem
                      item="Classification"
                      value={article?.classification}
                    />
                  )}
                  {article?.repository && (
                    <InfoItem item="Repository" value={article?.repository} />
                  )}
                  {article?.portfolio && (
                    <InfoItem item="Portfolio" value={article?.portfolio} />
                  )}
                  {article?.dimensions && (
                    <InfoItem item="Dimensions" value={article?.dimensions} />
                  )}
                </div>
                <div className="grid grid-cols-1 gap-2 p-2 text-lg">
                  <h3 className="text-2xl font-semibold">Artists</h3>
                  {article?.artistRole && (
                    <InfoItem item="Role" value={article?.artistRole} />
                  )}
                  {article?.artistDisplayName && (
                    <InfoItem item="Name" value={article?.artistDisplayName} />
                  )}
                  {article?.artistDisplayBio && (
                    <InfoItem item="Bio" value={article?.artistDisplayBio} />
                  )}
                  {article?.artistNationality && (
                    <InfoItem
                      item="Nationality"
                      value={article?.artistNationality}
                    />
                  )}
                  {article?.artistGender && (
                    <InfoItem item="Gender" value={article?.artistGender} />
                  )}
                  {article?.artistBeginDate && (
                    <InfoItem
                      item="Birth Date"
                      value={article?.artistBeginDate}
                    />
                  )}
                  {article?.artistEndDate && (
                    <InfoItem
                      item="Death Date"
                      value={article?.artistEndDate}
                    />
                  )}
                  {article?.artistWikidata_URL && (
                    <p>
                      <span className="font-semibold">
                        Artist Wikipedia Link:
                      </span>{" "}
                      <a
                        href={article?.artistWikidata_URL}
                        className="underline underline-offset-2"
                      >
                        Click here
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold">Results from Wikipedia</h3>
            {wikipediaResult && (
              <div className="flex flex-col gap-2">
                <a href={article?.objectWikidata_URL ?? "/"} target="_blank">
                  <img
                    width={wikipediaResult.thumbnail?.width || 100}
                    height={wikipediaResult.thumbnail?.height || 100}
                    src={wikipediaResult.thumbnail?.source}
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
        </>
      ) : (
        <p>
          <Loading title="Fetching article" />
        </p>
      )}
    </main>
  );
};

export default ArticlePage;
