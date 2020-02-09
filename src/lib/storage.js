const STORAGE_KEY_PREFIX = 'webcg-devtools.' + hashCode('' + window.location.pathname)

function getStorageItem (name, defaultValue) {
  try {
    const result = window.localStorage.getItem(STORAGE_KEY_PREFIX + '.' + name)
    return result !== null ? JSON.parse(result) : defaultValue
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

// https://stackoverflow.com/a/8831937
function hashCode (str) {
  var hash = 0
  if (!str || str.length === 0) {
    return hash
  }
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}
