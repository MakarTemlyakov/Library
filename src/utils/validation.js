const minLength = (value) => value.length >= 7;

const biggerLatterWithNumber = (value) =>
  value
    .replaceAll(' ', '')
    .split('')
    .some((char) => char === char.toUpperCase() && !Number.isNaN(Number(char)));

const isEnStr = (value) =>
  value.split('').every((char, index) => value.charCodeAt(index) >= 65 && value.charCodeAt(index) <= 90);

export { minLength, biggerLatterWithNumber, isEnStr };
