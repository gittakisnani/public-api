import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it } from "vitest";
import Article from "./Article";

describe("Article", () => {
  const testArticle = {
    objectID: 20498,
    isHighlight: true,
    accessionNumber: "2009.226.4",
    accessionYear: "2008",
    isPublicDomain: true,
    primaryImage:
      "https://images.metmuseum.org/CRDImages/ad/original/DP364292.jpg",
    primaryImageSmall:
      "https://images.metmuseum.org/CRDImages/ad/web-large/DP364292.jpg",
    additionalImages: [
      "https://images.metmuseum.org/CRDImages/ad/original/DP364293.jpg",
      "https://images.metmuseum.org/CRDImages/ad/original/DP364291.jpg",
      "https://images.metmuseum.org/CRDImages/ad/original/DP364289.jpg",
      "https://images.metmuseum.org/CRDImages/ad/original/DP364290.jpg",
      "https://images.metmuseum.org/CRDImages/ad/original/DP364294.jpg",
    ],
    constituents: [
      {
        constituentID: 182763,
        role: "Maker",
        name: "George A. Schastey &amp; Co.",
        constituentULAN_URL: "",
        constituentWikidata_URL: "",
        gender: "",
      },
      {
        constituentID: 7416,
        role: "Maker",
        name: "George A. Schastey",
        constituentULAN_URL: "http://vocab.getty.edu/page/ulan/500524814",
        constituentWikidata_URL: "https://www.wikidata.org/wiki/Q25051136",
        gender: "",
      },
    ],
    department: "The American Wing",
    objectName: "Side chair",
    title: "Side chair",
    culture: "American",
    period: "",
    dynasty: "",
    reign: "",
    portfolio: "",
    artistRole: "Maker",
    artistPrefix: "",
    artistDisplayName: "George A. Schastey & Co.",
    artistDisplayBio: "American, New York, 1873–1897",
    artistSuffix: "",
    artistAlphaSort: "George A. Schastey & Co.",
    artistNationality: "American",
    artistBeginDate: "1873",
    artistEndDate: "1897",
    artistGender: "",
    artistWikidata_URL: "",
    artistULAN_URL: "",
    objectDate: "1881–82",
    objectBeginDate: 1881,
    objectEndDate: 1882,
    medium: "Satinwood, purpleheart, brass castors, reproduction upholstery",
    dimensions:
      "Seat height: 20 1/4 (51.4 cm)\r\nFront-to-back: 23 in. (58.4 cm)\r\nCrest rail to floor: 36 7/8” (93.7 cm)\r\nSeat front s/s: 19 ¼” (48.9 cm)\r\nSeat back s/s:13 ½” (33 cm)",
    measurements: [
      {
        elementName: "Overall",
        elementDescription: null,
        elementMeasurements: {
          Depth: 58.420116,
          Height: 51.435104,
        },
      },
    ],
    creditLine: "Gift of The Museum of the City of New York, 2008",
    geographyType: "Made in",
    city: "New York",
    state: "New York",
    county: "",
    country: "United States",
    region: "Mid-Atlantic",
    subregion: "",
    locale: "",
    locus: "",
    excavation: "",
    river: "",
    classification: "",
    rightsAndReproduction: "",
    linkResource: "",
    metadataDate: "2022-06-02T12:28:57.13Z",
    repository: "Metropolitan Museum of Art, New York, NY",
    objectURL: "https://www.metmuseum.org/art/collection/search/20498",
    tags: null,
    objectWikidata_URL: "https://www.wikidata.org/wiki/Q104413006",
    isTimelineWork: false,
    GalleryNumber: "742",
  };

  it("Should render Article component correctly", () => {
    render(
      <BrowserRouter>
        <Article article={testArticle} />
      </BrowserRouter>
    );

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      testArticle?.primaryImage
    );

    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      testArticle?.title
    );
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      `${testArticle.country} ${testArticle.city}`
    );
  });
});
