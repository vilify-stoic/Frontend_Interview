

const Pagination = ({ setPageNumber, pageNumber, giphyList }) => {
  const handleSetPageNumber = (index) => {
    if (index > 0 && index <= Math.ceil(giphyList?.length / 10))
      setPageNumber(index);
  };

  return (
    <div className="pagination">
      <span
        className={pageNumber == 1 ? "pagination_disable" : ""}
        onClick={() => handleSetPageNumber(pageNumber - 1)}
      >
        ◀️
      </span>
      {new Array(Math.ceil(giphyList?.length / 10))
        .fill("")
        .map((val, index) => {
          return (
            <span
              key={index}
              className={index + 1 == pageNumber ? "selected" : ""}
              onClick={() => handleSetPageNumber(index + 1)}
            >
              {index + 1}
            </span>
          );
        })}

      <span
        className={
          pageNumber == Math.ceil(giphyList?.length / 10)
            ? "pagination_disable"
            : ""
        }
        onClick={() => handleSetPageNumber(pageNumber + 1)}
      >
        ▶️
      </span>
    </div>
  );
};

export default Pagination;
