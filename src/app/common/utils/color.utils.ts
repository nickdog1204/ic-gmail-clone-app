// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
export const hashCode = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const intToRGB = i => {
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return '#' + '00000'.substring(0, 6 - c.length) + c;
};

