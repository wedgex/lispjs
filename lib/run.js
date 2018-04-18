import last from "lodash/last";
import lispEval from "./eval";
import parse from "./parse";
import standardEnv from "./standardEnv";
import tokenize from "./tokenize";

export default (lisp, env = standardEnv()) => {
  return last(parse(tokenize(lisp)).map(exp => lispEval(exp, env)));
};
