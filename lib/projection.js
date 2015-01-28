"use strict";

var assign       = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var Dispatcher   = require("../index.js");

module.exports = function(NS, extension, dispatcherCallback) {
  var store = assign({
    broadcast       : function()   { this.emit(NS); },
    subscribe       : function(fn) { this.on(NS, fn); },
    unsubscribe     : function(fn) { this.removeListener(NS, fn)},
  }, EventEmitter.prototype, extension);

  if (dispatcherCallback !== undefined) {
    store["dispatcherToken"] = Dispatcher.register(dispatcherCallback.bind(store));
  }

  return store;
};


