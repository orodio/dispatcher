import Dispatcher     from "../index";
import {EventEmitter} from "events";
import assign         from "object-assign";

function Projection(NS) {
  this.NS = NS || "GLOBAL";
}

Projection.prototype = assign({}, EventEmitter.prototype, {

  broadcast() { this.emit(this.NS); },
  subscribe(fn) { this.on(this.NS, fn); },
  unsubscribe(fn) { this.removeListener(this.NS, fn); },

  register(NS, fn) {
    let _this = this;
    Dispatcher.register(function(payload) {
      if (payload.action.actionType !== NS) return;
      if (fn && typeof fn === "function") fn(payload.action, payload);
      _this.broadcast();
    });
  },

  derive(store, fn) {
    let _this = this;
    if (store.subscribe === undefined) return;
    store.subscribe(function() {
      if(fn && typeof fn === "function") fn();
      _this.broadcast();
    });
  }
});

export default Projection;
