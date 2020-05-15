// store.js
export const setKey = (key,data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getKey = (key) => {
    return JSON.parse(localStorage.getItem(key)) || '';
}

export const delKey = (key) => {
    localStorage.removeItem(key);
}