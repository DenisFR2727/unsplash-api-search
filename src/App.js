import React,{useState,useEffect} from "react";
import UnsplashImage from "./component/UnsplashImage";
import Heading from "./component/Heading";
import Loader from "./component/Loader";
import axios from "axios";

import './globalStyle.css';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import InfiniteScroll from "react-infinite-scroll-component";
import SearchImg from "./component/SearchImg";

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

function App() {
 const [images, setImage] = useState([]);


 useEffect(() => {
  fetchImages();
},[])

const fetchImages = (count = 16) => {
  const apiRoot = "https://api.unsplash.com";
  const accessKey = 'z4UC9SyAL8_PdvMWlhcTxbW5pycwUGOtE7qPTClEj9U';

  axios
    .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
    .then(res => {
      setImage([...images, ...res.data]);
      console.log(res.data);
    })
    
}
  return (
    <div className="App">
           <Heading />
           <SearchImg />
       
           <GlobalStyle />
           <InfiniteScroll
              dataLength={images.length}
              next={fetchImages}
              hasMore={true}
              loader={<Loader />}
            >
              <WrapperImages>
                {images.map(image => (
                  <UnsplashImage url={image.urls.thumb}  key={image.id} />
                ))}
              </WrapperImages>
           </InfiniteScroll>
    </div>
  );
}

export default App;
