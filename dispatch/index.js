import Dispatcher from "../index";
import assign     from "object-assign";

export default function(actionType, data={}, source="VIEW_ACTION") {
  Dispatcher.dispatch({
    source, action: assign({actionType}, data)
  });
}

