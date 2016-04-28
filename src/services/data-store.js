export class DataStore {
  getCollection(name) {
    let result = localStorage.getItem(name);
    if (!result) {
      return false;
    }
    return JSON.parse(result);
  }
  setCollection(name, rawValue, ignorePropName) {
    let newValue = JSON.stringify(rawValue, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (key === ignorePropName) {
          return;
        }
      }
      return value;
    });
    window.localStorage.setItem(name, newValue);
  }
  clearCollection(name) {
    window.localStorage.removeItem(name);
  }
}
