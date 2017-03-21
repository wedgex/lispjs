import eq from 'lodash/eq'
import isEqual from 'lodash/isEqual'
import zipWith from 'lodash/zipWith'
import Env from './Env'

const global = {
  true: true,
  false: false,
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '=': (a, b) => a == b,
  // need to be able to define a function first
  //apply: (f, ...args) => f(...args),
  begin: (...x) => x[x.length - 1],
  car: x => x[0],
  cdr: x => x.slice(1),
  cons: (a, b) => [a, b],
  'eq?': eq,
  'equal?': isEqual,
  length: x => x.length,
  list: (...x) => [...x],
  'list?': x => Array.isArray(x),
  map: (f, ...args) => zipWith(...args, f),
  max: Math.max,
  min: Math.min,
  not: x => !x,
  'null?': x => isEqual(x, []),
  'number?': x => !Array.isArray(x) && !isNaN(x),
  'procedure?': x => typeof x === 'function',
  round: Math.round,
  // symbol? TODO
}

export default () => new Env({}, { ...global })
