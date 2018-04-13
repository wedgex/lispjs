import standardEnv from "./standardEnv";
import Procedure from "./Procedure";

export default function lispEval(x, env = standardEnv()) {
  if (typeof x === "string") {
    // variable reference
    return env.get(x);
  } else if (x[0] === "quote") {
    // quotation
    const [_, exp] = x;
    return exp;
  } else if (!Array.isArray(x)) {
    // constant literal
    return x;
  } else if (x[0] === "if") {
    // conditional
    const [_, test, pass, fail] = x;
    return lispEval(lispEval(test, env) ? pass : fail, env);
  } else if (x[0] === "define") {
    // definition
    const [_, variable, expression] = x;
    env.set(variable, lispEval(expression, env));
  } else if (x[0] === "lambda") {
    // lambda
    const [_, params, body] = x;
    return Procedure(params, body, env, lispEval);
  } else {
    // procedure call
    const proc = lispEval(x[0], env);
    const args = x.slice(1).map(arg => lispEval(arg, env));
    return proc(...args);
  }
}
