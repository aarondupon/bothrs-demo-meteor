import React from "react";
import {Meteor} from "meteor/meteor";
import {render, hydrate} from "react-dom";
import App from "/imports/ui/App";
import useMeteorShopTracker from "../imports/api/hooks/useMeteorShopTracker";
import useMeteorHeroTracker from "../imports/api/hooks/useMeteorHeroTracker";

Meteor.startup(() => {
    const Root = () => {
        const [shopList] = useMeteorShopTracker();
        const [heroList] = useMeteorHeroTracker();

        // const [shopList,heroList] = window.__DATA;
        return (<App shopList={shopList} heroList={heroList}/>);
    };
    hydrate(<Root/>, document.getElementById("react-target"));
});
