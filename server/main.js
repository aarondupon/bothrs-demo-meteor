import { Meteor } from 'meteor/meteor';
import {Shop} from '/imports/api/shop';
import meteorAPI from '/imports/api/airtable/meteorAPI';

function insertShop(data) {
  Shop.insert({ ...data.fields, createdAt: new Date() });
}

Meteor.startup(() => {  
  // Shop.remove({})
  // meteorAPI.get(({data})=>{
  //   const {records} = data;
  //   records.forEach(element => {
  //     insertShop(element)
  //   }); 
  // })
});
