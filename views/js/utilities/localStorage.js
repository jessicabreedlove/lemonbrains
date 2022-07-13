/**
 * read a value from local storage and parse it as JSON
 * @param {string} key The key under which the value is stored under in LS
 * @return {array} The value as an array of objects /
 * @function readFromLS(key) { }
 */
function readFromLS(key) {
  // Get the item from Local Storage
  let itemFromLocalStorage = localStorage.getItem(key);
  // Convert the data to a JSON object
  const jsonObject = JSON.parse(itemFromLocalStorage);

  // Return the value as an array of objects
  return jsonObject;
}

function readSingleStringFromLS(key) {
  // Get the item from Local Storage
  let itemFromLocalStorage = localStorage.getItem(key);

  // Return the value as a string
  return itemFromLocalStorage;
}

/**
 * write an array of objects to local storage under the provided key
 * Serializes the data
 * @param  {string} key The key under which the value is stored under in LS
 * @param {array} data The information to be stored as an array of objects.
 * @function writeToLS(key, data) { }
 */
function writeToLS(key, data) {
  const serializedData = JSON.stringify(data);
  localStorage.setItem(key, serializedData);
}

// This method clears all local storage. Use it wisely.
//localStorage.clear();

export { readFromLS, writeToLS, readSingleStringFromLS };
