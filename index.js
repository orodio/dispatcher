"use strict";

var Dispatcher = require("flux").dispatcher;
var assign     = require("object-assign");

module.exports = assign(new Dispatcher(), {
  handleViewAction: function(action){
    this.dispatch({
      source : "VIEW_ACTION",
      action : action
    });
  },

  handleServerAction: function(action){
    this.dispatch({
      source : "SERVER_ACTION",
      action : action
    });
  },

  handleTrackAction: function(action){
    this.dispatch({
      source : "TRACK_ACTION",
      action : action
    });
  }
});
