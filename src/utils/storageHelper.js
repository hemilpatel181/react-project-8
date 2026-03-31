const USER_STORAGE = "users";
const REMOVED_STORAGE = "deletedUsers";

export const fetchUsers = () => {
  return JSON.parse(localStorage.getItem(USER_STORAGE)) || [];
};

export const storeUsers = (data) => {
  localStorage.setItem(USER_STORAGE, JSON.stringify(data));
};

export const fetchRemovedUsers = () => {
  return JSON.parse(localStorage.getItem(REMOVED_STORAGE)) || [];
};

export const storeRemovedUsers = (data) => {
  localStorage.setItem(REMOVED_STORAGE, JSON.stringify(data));
};