function get(env, identifier) {
  if (env instanceof Env) return env.get(identifier);
  return env[identifier];
}

export default class Env {
  inner = {};
  outer = {};

  constructor(outer = {}, inner = {}) {
    this.outer = outer;
    this.inner = inner;
  }

  _getInner(identifier) {
    return get(this.inner, identifier);
  }

  _getOuter(identifier) {
    return get(this.outer, identifier);
  }

  _isInnerVariable(identifier) {
    return Object.keys(this.inner).includes(identifier);
  }

  get(identifier) {
    if (this._isInnerVariable(identifier)) {
      return this._getInner(identifier);
    }
    return this._getOuter(identifier);
  }

  set(identifier, value) {
    this.inner[identifier] = value;
  }
}
