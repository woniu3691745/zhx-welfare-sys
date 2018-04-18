const ls = window.sessionStorage
export const getItem = (key) => {
  try {
    return JSON.parse(ls.getItem(key))
  } catch (err) {
    return null
  }
}
export const setItem = (key, val) => {
  ls.setItem(key, JSON.stringify(val))
}
export const clear = () => {
  ls.clear()
}
export const keys = () => {
  return ls.keys()
}
export const removeItem = (key) => {
  ls.removeItem(key)
}
