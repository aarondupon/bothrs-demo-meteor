import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {useTracker} from 'react-meteor-hooks';

import {Shop} from '../api/shop';

const Info = (props)=>{
  const {shop} = useTracker(() => ({
    shop:Shop.find().fetch()
  }), [])
  console.log("data",shop)
  return null

}

export default Info;

/*
export default InfoContainer = withTracker(() => {
  return {
    shop: Shop.find().fetch(),
  };
})(Info);
*/
