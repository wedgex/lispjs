import { eq, isEqual, zipWith } from "lodash";
import Env from "./Env";

const global = {
  true: true,
  false: false,
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  ">": (a, b) => a > b,
  "<": (a, b) => a < b,
  ">=": (a, b) => a >= b,
  "<=": (a, b) => a <= b,
  "=": (a, b) => a == b,
  begin: (...x) => x[x.length - 1],
  car: x => x[0],
  cdr: x => x.slice(1),
  cons: (a, b) => [a, b],
  "eq?": eq,
  "equal?": isEqual,
  length: x => x.length,
  list: (...x) => [...x],
  "list?": x => Array.isArray(x),
  map: (f, ...args) => zipWith(...args, f),
  max: Math.max,
  min: Math.min,
  not: x => !x
};

export default () => new Env({ ...global });
