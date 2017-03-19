import standardEnv from './standardEnv'

export default function lispEval(x, env={ ...standardEnv }) {
  if (typeof x === 'string') {      // variable reference
    return env[x]
  } else if (x[0] === 'quote') {    // quotation
    const [_, exp] = x
    return exp
  } else if (!Array.isArray(x)) {   // constant literal
    return x
  } else if (x[0] === 'if') {       // conditional
    const [_, test, pass, fail] = x
    return lispEval(lispEval(test) ? pass : fail)
  } else if (x[0] === 'define') {   // definition
    const [_, variable, expression] = x
    env[variable] = lispEval(expression, env)
  } else {                          // procedure call
    const proc = lispEval(x[0], env)
    const args = x.slice(1).map(arg => lispEval(arg, env))
    return proc(...args)
  }
}
