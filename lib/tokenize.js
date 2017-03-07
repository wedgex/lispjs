const tokenize = string => (
  string
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .split(' ')
    .filter(s => s)
)

export default tokenize
