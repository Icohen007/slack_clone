const getNested = (obj, path) => {
  const properties = path.split('.');
  return properties.reduce((prev, key) => prev[key], obj);
};

export const groupBY = (objArray, path) => objArray.reduce((acc, cur) => {
  const value = getNested(cur, path);
  if (!acc[value]) {
    acc[value] = [];
  }
  acc[value].push(cur);
  return acc;
}, {});

export const parseDate = (date) => {
  const pad2 = (d) => (d < 10 ? '0' : '') + d;

  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${pad2(day)}/${pad2(month)}/${pad2(fullYear)} ${pad2(hours)}:${pad2(minutes)}`;
};

export const getPluralOrdinal = (size, baseText) => (size === 1 ? `${size} ${baseText}`
  : `${size} ${baseText}s`);
