import zipObject from "lodash/zipObject";
import Env from "./Env";

function createClosure(env, params, args) {
  return new Env(env, zipObject(params, args));
}

export default function create(params, body, env, lispEval) {
  return (...args) => lispEval(body, createClosure(env, params, args));
}
