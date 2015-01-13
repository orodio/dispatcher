"use strict";

var Dispatcher = require("../index.js");
var assign     = require("object-assign");

module.exports = function(actionType, data) {
  Dispatcher.handleViewAction(assign({actionType: actionType}, data||{}));
}
