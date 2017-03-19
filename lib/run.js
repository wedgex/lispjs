import lispEval from './eval'
import parse from './parse'

export default lisp => lispEval(parse(lisp))
