"use strict";

import assign         from "object-assign";
import {EventEmitter} from "events";
import Dispatcher     from "./index";

export default function(NS, extension, dispatcherCallback) {
  let store = assign({
    broadcast()     { this.emit(NS); },
    subscribe(fn)   { this.on(NS, fn); },
    unsubscribe(fn) { this.removeLIstener(NS, fn); }
  }, EventEmitter.prototype, extension);

  if (dispatcherCallback) {
    store["dispatcherToken"] = Dispatcher.register(dispatcherCallback.bind(store));
  }

  return store;
};
