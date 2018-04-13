import lispEval from "./eval";
import parse from "./parse";
import standardEnv from "./standardEnv";
import last from "lodash/last";

export default (lisp, env = standardEnv()) => {
  return last(parse(lisp).map(exp => lispEval(exp, env)));
};
