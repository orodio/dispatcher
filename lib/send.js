"use strict";

var Dispatcher = require("../index.js");
var assign     = require("object-assign");

module.exports = function(actionType, data) {
  console && console.warn("oro-dispatcher/lib/send is depricated. Please use oro-dispatcher/send");

  Dispatcher.handleViewAction(assign({actionType: actionType}, data||{}));
}
