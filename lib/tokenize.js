const tokenize = string =>
  string
    .replace(/\(/g, " ( ")
    .replace(/\)/g, " ) ")
    .split(/\s+/)
    .filter(s => s);

export default tokenize;
