dispatcher
==========

basic reusable flux dispatcher

```javascript
var dispatcher = require("dispatcher");

// Actions

module.exports = {
  add(key: string) {
    dispatcher.handleViewAction({
      actionType : "THING_ADD",
      key        : key
    });
  }
};

// Store

Store.dispatcherToken = dispathcer.register(function(payload) {
  if (payload.source !== "VIEW_SOURCE") return;
  
  var action = payload.action;
  
  switch (action.actionType) {
    case "THING_ADD":
      addTheThing(action.key);
      Store.broadcast();
      break;
  }
});

```
