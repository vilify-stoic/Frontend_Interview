import React, { useState } from "react";

const ButtonList = ({ handleSetTimeDetails }) => {
  const lists = ["Today", "Hourly"];

  const [isSeclected, setIselected] = useState("Today");

  const handleClick = (list) => {
    handleSetTimeDetails(list);
    setIselected(list);
  };

  return (
    <div className="button-list">
      {lists.map((list, index) => {
        return (
          <button
            className={isSeclected == list ? "selected" : ""}
            key={index}
            onClick={() => handleClick(list)}
          >
            {list}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonList;
