import tokenize from "./tokenize";

export default function parse(code) {
  const tokens = tokenize(code);
  if (!tokens.length) throw new EofError(`Unexpected EoF`);
  const expressions = [];
  while (tokens.length) {
    expressions.push(readExpression(tokens));
  }
  return expressions;
}

function createAtom(token) {
  const number = Number(token);
  if (!isNaN(number)) return number;

  return token;
}

function readExpression(tokens) {
  const expressions = [];

  const token = tokens.shift();

  if (token === "(") {
    const exp = [];
    while (tokens[0] !== ")") {
      exp.push(readExpression(tokens));
    }
    tokens.shift();
    return exp;
  } else if (token === ")") {
    throw new UnmatchedError(`${token} ${tokens.join(" ")}`);
  }

  return createAtom(token);
}

class EofError extends Error {
  constructor() {
    super("Unexpected EoF");
  }
}

class UnmatchedError extends Error {
  constructor(expression) {
    super("Unexpected )");
    this.stack = expression;
  }
}
