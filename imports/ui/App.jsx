import React, { useContext } from "react";
import List from "./components/List";
import Card from "./components/Card";
import Hero from "./components/Hero/Hero";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { RenderContextProvider } from "../context/renderContext";

const theme = {
  color: "#0C2358",
  secondColor: "#5BC9BF",
  headerTextColor: "#ffffff",
  headerButtonColor: "#9013FE"
};

const createList = (title, data) => (
  <List key={title} title={title}>
    {data.map((data, idx) => (
      <Card
        key={idx}
        source={data.Afbeelding[0].url}
        title={data.Naam}
        text={data.Beschrijving}
        coins={data.Coins}
      />
    ))}
  </List>
);

const AppContainer = styled.div`
  width: 90%;
  padding: 20px 20px;
  max-width: 1160px;

  position: absolute;
  display: inline-block;
  margin-left: 50%;
  transform: translate(-50%, 0);
`;
const App = ({ shopList, heroList }) => {
  
  return (
    <ThemeProvider theme={theme}>
      <RenderContextProvider
        value={{
          isClient: Meteor.isClient
        }}
      >
        <AppContainer>
          <Hero pages={heroList} />
          {Object.keys(shopList).map(key => createList(key, shopList[key]))}
        </AppContainer>
      </RenderContextProvider>
    </ThemeProvider>
  );
};

export default App;