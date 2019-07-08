import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render, hydrate } from 'react-dom';
import App from '/imports/ui/App'

Meteor.startup(() => {
  hydrate(<App />, document.getElementById('react-target'));
});
