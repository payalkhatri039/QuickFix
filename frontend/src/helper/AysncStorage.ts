/**
 * @description
 * Generic helper functions that take care of adding or getting
 * data from local storage.
 */

export const getDataFromLocalStorage = async (key: string) => {
  const data = await localStorage.getItem(key);
  if (data === null) return {};
  return JSON.parse(data);
};

export const setLocalStorageData = async (key: string, data: any) => {
  const stringifiedData = JSON.stringify(data);
  await localStorage.setItem(key, stringifiedData);
};
