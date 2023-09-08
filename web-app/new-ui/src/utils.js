export function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // Object has at least one property
    }
  }
  return true; // Object is empty
}
