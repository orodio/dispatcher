"use strict";

module.exports = function(store, state) {
  return {
    getInitialState      : state,
    update               : function() { this.setState(state()); },
    componentWillMount   : function() { store.subscribe(this.update); },
    componentWillUnmount : function() { store.unsubscribe(this.update); }
  }
}
