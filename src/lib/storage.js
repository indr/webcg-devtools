const STORAGE_KEY_PREFIX = 'webcg-devtools'

function getStorageItem (name, defaultValue) {
  try {
    const result = window.localStorage.getItem(STORAGE_KEY_PREFIX + '.' + name)
    return result !== undefined ? JSON.parse(result) : defaultValue
  } catch (err) {
    return defaultValue
  }
}

function setStorageItem (name, value) {
  window.localStorage.setItem(STORAGE_KEY_PREFIX + '.' + name, JSON.stringify(value))
}

const storage = {
  get: getStorageItem,
  set: setStorageItem
}

export default storage
export {
  getStorageItem, setStorageItem
}
