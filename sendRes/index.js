import send from "../send";

function idFn(n) { return n; }

function isArray(n) {
  return Object.prototype.toString.call(n) === Object.prototype.toString.call([]);
}

export default function(actionType, xForm=idFn, source) {
  return function(res={}) {
    let response = isArray(res)
      ? {collection: xForm(res)}
      : xForm(res);

    send(actionType, response, source);
  }
}
