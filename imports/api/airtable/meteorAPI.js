import Airtable from 'airtable';
import {HTTP} from 'meteor/http';

var base = new Airtable({ apiKey: "key8b2zzEwI2BEiRl" }).base(
  "appeF1WBhrIqyiyaX"
);

const createRecord = record => ({
  Afbeelding: record.get("Afbeelding"),
  Categorie: record.get("Categorie"),
  Coins: record.get("Coins"),
  Naam: record.get("Naam"),
  Beschrijving: record.get("Beschrijving")
});

const AirtableAPI = {
  get: (next = () => {}) => {
    const response = HTTP.get('https://api.airtable.com/v0/appeF1WBhrIqyiyaX/Shop?maxRecords=100&view=Grid%20view', {
    headers: {
      'content-type': 'application/json',
      'Authorization':'Bearer key8b2zzEwI2BEiRl',
    }
    
    })
    next(response);
    
  }
    
};

export default AirtableAPI;
