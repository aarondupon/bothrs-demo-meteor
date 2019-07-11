import React from "react";
import {Meteor} from "meteor/meteor";
import {render, hydrate} from "react-dom";
import App from "/imports/ui/App";
import useMeteorShopTracker from "../imports/api/hooks/useMeteorShopTracker";
import useMeteorHeroTracker from "../imports/api/hooks/useMeteorHeroTracker";

Meteor.startup(() => {
    const Root = () => {
      let [s] = useMeteorShopTracker();
      let [h] = useMeteorHeroTracker();

      if(window.__DATA){
        shopList = window.__DATA[0];
        heroList = window.__DATA[1];
      }else{
        shopList = s;
        heroList = h;
      }
     
        return (<App 
            shopList={shopList}
            heroList={heroList}
            />);
    };
    hydrate(<Root/>, document.getElementById("react-target"));
});
