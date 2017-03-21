import zipObject from 'lodash/zipObject'
import Env from './Env'

export default function Procedure(params, body, env, lEval) {
  return (...args) => {
    return lEval(body, new Env(zipObject(params, args), env))
  }
}
