import readline from 'readline'
import run from '../lib/run'
import standardEnv from '../lib/standardEnv'

function toString(exp) {
  if (Array.isArray(exp)) {
    return `(${exp.map(x => toString(x)).join(' ')})`
  }

  return exp
}

function repl() {
  console.log('lisp.js repl')
  const env = standardEnv()
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.setPrompt('> ')
  rl.prompt()

  rl.on('line', input => {
    const val = run(input, env)
    if (val) console.log(toString(val))
    rl.prompt()
  })
}

repl()
