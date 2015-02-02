"use strict";

module.exports = function(store, state) {
  console && console.warn("oro-dispatcher/lib/subscribe is depricated. Please use oro-dispatcher/sub");

  return {
    getInitialState      : state,
    update               : function() { this.setState(state()); },
    componentWillMount   : function() { store.subscribe(this.update); },
    componentWillUnmount : function() { store.unsubscribe(this.update); }
  }
}
