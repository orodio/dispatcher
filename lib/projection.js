"use strict";

var assign       = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var Dispatcher   = require("../index.js");

module.exports = function(NS, dispatcherCallback, extention) {
  return assign({
    broadcast       : function()   { this.emit(NS); },
    subscribe       : function(fn) { this.on(NS, fn); },
    unsubscribe     : function(fn) { this.removeListener(NS, fn)},
    dispatcherToken : Dispatcher.register(dispatcherCallback)
  }, EventEmitter.prototype, extention);
};


