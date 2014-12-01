dispatcher
==========

basic reusable flux dispatcher

> Basically a pattern I found myself doing over and over and over again everytime I made a new React/Flux Application. The main part of it is pretty much a one for one implementation of the Dispatchers in the [Flux Examples](https://github.com/facebook/flux/tree/master/examples) 

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
