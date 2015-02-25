import Dispatcher  from "../index";
import assign      from "object-assign";
import { Promise } from "es6-promise";

export default function(actionType, data={}, source="VIEW_ACTION") {
  return new Promise(function(resolve, reject) {
    Dispatcher.dispatch({ source, action: assign({actionType}, data) });
    return resolve(data);
  })
}

