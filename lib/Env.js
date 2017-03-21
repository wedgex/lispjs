export default function Env(inner={}, outer={}) {
  this.get = (param) => {
    if (Object.keys(inner).includes(param)) return inner[param]
    if (outer.get) return outer.get(param)
    return outer[param]
  }

  this.set = (param, value) => {
    inner[param] = value
  }
}
