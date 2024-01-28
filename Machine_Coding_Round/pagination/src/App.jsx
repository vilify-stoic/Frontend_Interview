import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    console.log(data);
    setProducts(data.products);
    console.log(products);
  };

  function setPage(pageNo) {
    if (pageNo >= 1 && pageNo <= products.length / 10 && pageNumber != pageNo)
      setPageNumber(pageNo);
  }

  return (
    <>
      <h1> Hello CodeSandbox </h1>
      <div>
        {products.length > 0 && (
          <div className="products">
            {products
              .slice(pageNumber * 10 - 10, pageNumber * 10)
              .map((prod) => {
                return (
                  <span className="products__single" key={prod.id}>
                    <img src={prod.thumbnail} alt={prod.alt} />
                    <span>{prod.title}</span>
                  </span>
                );
              })}
          </div>
        )}
      </div>
      <div className="pagination">
        <span
          className={pageNumber <= 1 ? "pagination__disable" : ""}
          onClick={() => setPage(pageNumber - 1)}
        >
          ◀️{" "}
        </span>
        {[...Array(products.length / 10)].map((prod, index) => {
          return (
            <span
              className={index + 1 == pageNumber ? "selected" : ""}
              key={index}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </span>
          );
        })}
        <span
          onClick={() => setPage(pageNumber + 1)}
          className={
            pageNumber >= products.length / 10 ? "pagination__disable" : ""
          }
        >
          ▶️{" "}
        </span>
      </div>
    </>
  );
}
