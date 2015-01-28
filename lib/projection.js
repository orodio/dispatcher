"use strict";

var assign       = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var Dispatcher   = require("../index.js");

module.exports = function(NS, extention, dispatcherCallback) {
  var store = assign(EventEmitter.prototype, extention, {
    broadcast       : function()   { this.emit(NS); },
    subscribe       : function(fn) { this.on(NS, fn); },
    unsubscribe     : function(fn) { this.removeListener(NS, fn)},
  });

  if (dispatcherCallback !== undefined) {
    store["dispatcherToken"] = Dispatcher.register(dispatcherCallback.bind(store));
  }

  return store;
};


