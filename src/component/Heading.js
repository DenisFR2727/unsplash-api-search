import React from 'react'
import styled from 'styled-components';

const Header = styled.div`
        width: 100%;
        height: 30px;
        background: blue;
        text-align: center;
        color: red;
`
function Heading(){
  return (<>
       <Header>WallpapersCraft</Header>
  </>
  )
}
export default Heading;
