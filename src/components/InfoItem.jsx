import React from "react";

const InfoItem = ({ item, value }) => {
  return (
    <p>
      <span className="font-semibold capitalize">{item}:</span> {value}
    </p>
  );
};

export default InfoItem;
