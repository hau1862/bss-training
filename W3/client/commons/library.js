function getItem(key) {
  const result = localStorage.getItem(key);
  return result ? JSON.parse(result) : false;
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
  localStorage.removeItem(key);
}

export {
  getItem, setItem, removeItem
};
