"use strict";

import assign         from "object-assign";
import {EventEmitter} from "events";
import Dispatcher     from "./index";

/** store export object
 *  @param {string} NS namespace for events
 *  @param {?object} exp export object for store
 *  @param {?function} dispCb context of current store, dispatcher callback (is passed payload from dispathcer)
 *  @param {?function} update context of current store, a function to call when subscribes stores change
 *  @param {...store} subs the subscribed stores, will call update when one braodcasts a change
 *
 *  @return {store}
 *  @return {store.subscribe}
 *  @return {store.unsubscribe}
 *  @return {store.broadcast}
 *  @return {?store.token} if dispCb is supplied
 */

export default function(NS, exp, dispCb, update, ...subs) {

  let _store = assign({
    broadcast()     { this.emit(NS); },
    subscribe(fn)   { this.on(NS, fn); },
    unsubscribe(fn) { this.removeListener(NS, fn); }
  }, EventEmitter.prototype, exp);

  if (dispCb) _store["token"] = Dispatcher.register(dispCb.bind(_store));
  if (update) subs.forEach(sub => sub.subscribe(update.bind(_store)));

  return store;
};

/** # The basic use of store...
 *  # Exports a single function call getAll()
 *  # getAll will never return anything else if done this way
 *
 *  import store from "oro-dispatcher/store";
 *
 *  let __things = [];
 *
 *  export default store("THINGS", {
 *    getAll() { return __things; }
 *  })
 *
 */

/** # A store that registers a dispatcher callback
 *
 *  import store from "oro-dispatcher/store";
 *
 *  let __things = [];
 *
 *  export default store("THINGS", {
 *
 *    getAll() { return __things; }
 *
 *  }, function(payload) {
 *
 *    let {actionType, thing} = payload.action;
 *
 *    switch (actionType) {
 *      case "THINGS_ADD":
 *        __things.push(thing);
 *        this.broadcast();
 *        break;
 *    }
 *
 *  });
 *
 */

/** # A store that subscribes to other stores
 *  # NOTE that the dispatcher callback is specified as undefined
 *
 *  import store  from "oro-dispatcher/store";
 *  import things from "./things";
 *
 *  let __things = [];
 *
 *  export default store("SORTED_THINGS", {
 *
 *    getAll() { return __things; }
 *
 *  }, undefined, function() {
 *
 *    __things = things.getAll().sort(a, b => return b.value - a.value);
 *    this.broadcast();
 *
 *  }, things);
 */


/** # A store that subscribes to other stores and has a dispatcher callback
 *
 *  import store        from "oro-dispatcher/store";
 *  import sortedThings from "./sortedThings";
 *
 *  let __things = [];
 *  let __filter = "";
 *
 *  export default store("FILTERED_SORTED_THINGS", {
 *
 *    getAll()    { return __things; },
 *    getFilter() { return __filter; }
 *
 *  }, function(payload) {
 *
 *    let {actionType, filter} = payload.action;
 *
 *    switch (actionType) {
 *      case "FILTERED_SORTED_THINGS_FILTER_UPDATE":
 *        __filter = filter;
 *        let re   = new RegExp(filter);
 *        __things = sortedThings.getAll().filter(d = > d.title.test(re));
 *        this.broadcast();
 *        break;
 *    }
 *  }, function() {
 *
 *    __things = sortedThings.getAll();
 *    this.broadcast();
 *
 *  }, sortedThings);
 */
