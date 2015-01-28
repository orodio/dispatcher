"use strict";

var assign       = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var Dispatcher   = require("../index.js");

module.exports = function(NS, extention, dispatcherCallback) {
  var temp = assign(EventEmitter.prototype, {
    broadcast       : function()   { this.emit(NS); },
    subscribe       : function(fn) { this.on(NS, fn); },
    unsubscribe     : function(fn) { this.removeListener(NS, fn)},
  });

  if (dispatcherCallback !== undefined) {
    temp["dispatcherToken"] = Dispatcher.register(dispatcherCallback);
  }

  return assign(temp, extention);
};


