"use strict";

export default function(state, ...stores) {
  if (stores[0].length) stores = stores[0];

  return {
    getInitialState        : state,
    update()               { this.setState(state()); },
    componentWillMount()   { stores.forEach(s => s.subscribe(this.update)) },
    componentWillUnmount() { stores.forEach(s => s.unsubscribe(this.update)) }
  };
}
