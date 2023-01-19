// Get data from local storage and return it
export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
};

// Set data to local storage
export const setToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Remove data from local storage
export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
