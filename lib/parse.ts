import tokenize from './tokenize'

export default function parse(code) {
  return readFromTokens(tokenize(code))
}

function atom(token) {
  const number = Number(token)
  if (!isNaN(number)) return number

  return token
}

function readFromTokens(tokens) {
  if (!tokens.length) throw new EofError(`Unexpected EoF`)

  const token = tokens.shift()

  if (token === '(') {
    const exp = []
    while (tokens[0] !== ')') {
      exp.push(readFromTokens(tokens))
    }
    tokens.shift()
    return exp
  } else if (token === ')') {
    throw new UnmatchedError(`${token} ${tokens.join(' ')}`)
  }

  return atom(token)
}

class EofError extends Error {
  constructor() {
    super('Unexpected EoF')
  }
}

class UnmatchedError extends Error {
  constructor(expression) {
    super('Unexpected )')
    this.stack = expression
  }
}
