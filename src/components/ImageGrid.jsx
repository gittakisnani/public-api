import React, { useState } from "react";

const ImageGrid = ({ primaryImage, additionalImages, title }) => {
  const [displayedImage, setDisplayedImage] = useState(primaryImage);

  const handleChangeImage = (e) => setDisplayedImage(e.target.src);
  return (
    <div className="flex flex-col gap-4 md:flex-row md:min-w-[60%]">
      {primaryImage && (
        <div className="md:max-w-[700px] min-h-full">
          <img
            src={displayedImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex md:flex-col flex-wrap md:flex-nowrap gap-4">
        <div
          onClick={handleChangeImage}
          style={
            primaryImage === displayedImage ? { borderColor: "black" } : null
          }
          className="w-[120px] cursor-pointer border border-transparent h-[120px] overflow-hidden"
        >
          <img
            src={primaryImage}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        {additionalImages?.map((image, index) => (
          <div
            onClick={handleChangeImage}
            style={image === displayedImage ? { borderColor: "black" } : null}
            className="w-[120px] cursor-pointer border border-transparent h-[120px] overflow-hidden"
          >
            <img
              src={image}
              alt={title}
              key={index}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
