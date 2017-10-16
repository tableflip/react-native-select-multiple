// merge the passed styles into a flat array
export function mergeStyles () {
  return Array.prototype.concat.apply([], arguments)
}
