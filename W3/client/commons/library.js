function getItem(key) {
  let result = localStorage.getItem(key);
  return result ? JSON.parse(result) : false;
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
  localStorage.removeItem(key);
}

function clear() {
  localStorage.clear();
}

export {
  getItem, setItem, removeItem, clear
};
