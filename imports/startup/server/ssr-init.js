import { onPageLoad } from "meteor/server-render";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import List from "../../ui/components/List";
import Card from "../../ui/components/Card";
import { default as HeroBox } from "../../ui/components/Hero/Hero";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { Shop } from "../..//api/shop";
import { Hero } from "../..//api/hero";
import * as R from "ramda";
import { ServerStyleSheet } from "styled-components";
import { RenderContextProvider } from "../../context/renderContext";

// import x from '../../ui/stylesheets/App.css';
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

const group = R.groupBy(R.prop("Categorie"));
onPageLoad(sink => {
 
  const listData = group(Shop.find({}).fetch());
  const heroData = Hero.find().fetch(); 
  const App = props => {
    return (
      <ThemeProvider theme={theme}>
          <RenderContextProvider value={{isClient:Meteor.isClient}}>
            <AppContainer>
            <HeroBox pages={heroData}  />
            {Object.keys(listData).map(key => createList(key, listData[key]))}
            </AppContainer>
        </RenderContextProvider>
      </ThemeProvider>
    );
  };

  const sheet = new ServerStyleSheet();
  const appJSX = sheet.collectStyles(<App location={sink.request.url} />);
  const htmlStream = sheet.interleaveWithNodeStream(renderToNodeStream(appJSX));
  sink.renderIntoElementById("react-target", htmlStream);


  sink.appendToBody(`
    <style>

  @import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
  body {
      margin: 0;
      font-family: Poppins,-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: #EEEEEE;
    }
    
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }
    
    
    
    /* http://meyerweb.com/eric/tools/css/reset/ 
       v2.0 | 20110126
       License: none (public domain)
    */
    
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    
  
    </style>
  `);
});
