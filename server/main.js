import { Meteor } from 'meteor/meteor';
import {Shop} from '/imports/api/shop';
import {Hero} from '/imports/api/hero';
import meteorAPI from '/imports/api/airtable/meteorAPI';

function insertShop(data) {
  Shop.insert({ ...data.fields, createdAt: new Date() });
}

Meteor.startup(() => {  
  // Hero.insert({ title:"dmo",action:"doemeearearz", createdAt: new Date() });
  /** local testing inject from airtable */
  // Shop.remove({})
  // meteorAPI.get(({data})=>{
  //   const {records} = data;
  //   records.forEach(element => {
  //     insertShop(element)
  //   }); 
  // })
  
});
