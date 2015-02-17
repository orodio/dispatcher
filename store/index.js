import assign         from "object-assign";
import {EventEmitter} from "events";
import Dispatcher     from "../index";

export default function(NS, exp, dispCb, update, ...subs) {

  let _store = assign({
    broadcast()     { this.emit(NS); },
    subscribe(fn)   { this.on(NS, fn); },
    unsubscribe(fn) { this.removeListener(NS, fn); }
  }, EventEmitter.prototype, exp);

  if (dispCb) _store["token"] = Dispatcher.register(dispCb.bind(_store));
  if (update) subs.forEach(sub => sub.subscribe(update.bind(_store)));

  return _store;
};

