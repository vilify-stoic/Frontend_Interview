import { useEffect, useState } from "react";
import "./styles.css";
import Pagination from "./components/Pagination";

const API_KEY = "RCrfdq3a6OyCONJnYNGGCaXbDxQZOYpc";

export default function App() {
  const [tabSelected, setTabSelected] = useState("gifs");
  const [giphyList, setGiphyList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchOrNot, setSearchOrNot] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const getTrendingGiphyList = async () => {
    const url = `https://api.giphy.com/v1/${tabSelected}/trending?api_key=${API_KEY}&limit=25`;
    const res = await fetch(url);
    const giphyData = await res.json();
    setGiphyList(giphyData?.data);
  };

  const getSearchGiphyList = async () => {
    const url = `https://api.giphy.com/v1/${tabSelected}/search?api_key=${API_KEY}&limit=25&q=${searchValue}`;
    const res = await fetch(url);
    const giphyData = await res.json();
    setGiphyList(giphyData?.data);
  };

  useEffect(() => {
    let timer;
    if (searchOrNot === true) {
      timer = setTimeout(() => {
        getSearchGiphyList();
      }, 3000);
    } else {
      getTrendingGiphyList();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, tabSelected]);

  useEffect(() => {
    const localTabSelected = localStorage.getItem("tabSelected");
    if(localTabSelected!=null){
      setTabSelected(localTabSelected);
    }
    
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value == "") {
      setSearchOrNot(false);
    } else setSearchOrNot(true);
  };

  const handleTab = (value) => {
    localStorage.setItem("tabSelected", value);
    setTabSelected(value);
    setSearchOrNot(false);
  };


  return (
    <div className="App">
      <div className="header">
        <input
          type="text"
          placeholder="Input Keywords to Search"
          value={searchValue}
          onChange={(e) => handleSearch(e)}
        />
     
      <div className="tabs">
        <button
          className={tabSelected == "gifs" ? "tab_selected " : ""}
          onClick={() => handleTab("gifs")}
        >
          Gifs{" "}
        </button>
        <button
          className={tabSelected == "stickers" ? "tab_selected " : ""}
          onClick={() => handleTab("stickers")}
        >
          Stickers{" "}
        </button>
      </div>
      </div>
      <div className="image-grid">
        {giphyList?.length > 0 ? (
          giphyList
            .slice(pageNumber * 10 - 10, pageNumber * 10)
            .map((giphy) => {
              return (
                <div key={giphy.id}>
                  <p>{giphy.title}</p>
                  <iframe src={giphy.embed_url} title="W3school"></iframe>
                </div>
              );
            })
        ) : (
          <div>Loading</div>
        )}
      </div>
      <Pagination
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        giphyList={giphyList}
      />
    </div>
  );
}
