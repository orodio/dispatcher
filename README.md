dispatcher
==========

**NOTE** The javascript exported in this module is written as es6 modules. You will probably need to transpile it to make it work. Tip for React folks: `6to5-loader` for `webpack` does jsx as well by default.

## Actions
```javascript
// Counter/actions.js

import send from "oro-dispatcher/send";

export default {
  // ...
  inc(uuid) { send("COUNTER_INC", {uuid}) }
  // ...
};
```

## Store
```javascript
// Counters/store.js

import store from "oro-dispatcher/store";

var __counters = {
  "asdf" : {uuid: "asdf", count: 4, label: "foo"},
  "woot" : {uuid: "woot", count: 5, label: "bar"}
}

export default store("COUTNER", {

  getCounters() { return __counters; }

}, function(paylaod) {
  let {actionType, uuid} = paylaod.action;

  switch (actionType) {
    // ...

    case "COUNTER_INC":
      __counters[uuid] = __counters[uuid] + 1;
      this.broadcast();
      break;

    // ...
  }
});
```

## Component
```javascript
// Counters/index.js

import React from "react";
import sub   from "oro-dispatcher/sub";
import store from "./store";

function state() {
  return {
    counters: store.getCounters()
  };
}

export default React.createClass({
  mixins: [sub(state, store)],

  render() {
    let {counters} = this.state;

    return <div>
      {counters.map(d => <Counter {...d}/>)}
    </div>
  }
});

```
