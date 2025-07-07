function getFromLocalStorage(key: string) {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(key);
}

function setToLocalStorage(key: string, value: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, value);
  }
}

function removeFromLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
}

// This function will clear the browser's local storage
function clearLocalStorage() {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }
}

export {
  clearLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
};
