import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

const Title = ({ isHighlight, title }) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-xl">
        {isHighlight ? <BsStarFill color="green" /> : <BsStar />}
      </p>
      <h2 className="font-semibold text-xl">{title}</h2>
    </div>
  );
};

export default Title;
