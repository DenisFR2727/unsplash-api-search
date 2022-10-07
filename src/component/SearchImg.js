import React, { useState, useEffect } from "react";


import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
// Style styled-components
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Search = styled.div`
  display: flex;
  justify-content: center;
`

const SearchImg = () => {
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);

/// fetch запрос
  const fetchRequest = async () => {
    const AccessKey = 'z4UC9SyAL8_PdvMWlhcTxbW5pycwUGOtE7qPTClEj9U';
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${AccessKey}&per_page=12`
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    console.log(result);
    setRes(result);
  };

  useEffect(() => {
    // fetch функция в useEffect
    fetchRequest();
  }, []);

  //button Submit
  const Submit = () => {
    fetchRequest();
    setImg("");
  };

  return (
    <>
    <GlobalStyle />
      <div className="container-fluid">
        <div className="row">
         <Search>
              <input
                type="text"
                placeholder="Search Anything..."
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
              <button
                type="submit"
                onClick={Submit}
              >
                Search
              </button>
            </Search>
         <WrapperImages>
              {res.map((val) => {
                return (
                  <>
                    <Img
                      key={val.id}
                      src={val.urls.thumb}
                      alt="val.alt_description"
                    />
                  </>
                );
              })}
         </WrapperImages>
        </div>
      </div>
    </>
  );
};
export default SearchImg;