import lispEval from './eval'
import parse from './parse'
import standardEnv from './standardEnv'

export default (lisp, env={ ...standardEnv }) => lispEval(parse(lisp), env)
