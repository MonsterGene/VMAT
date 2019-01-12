export function _isArray (obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  } else {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
}

export function _isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function deepCopyObject (obj) {
  if (!obj) {
    console.log('Can not copy this data: ', obj);
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
}

export function takeInt (v, t) {
  if (t) {
    return Math.ceil(v);
  } else {
    return Math.floor(v);
  }
}
