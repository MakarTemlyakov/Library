const minLength = (value) => value.length >= 7;

const biggerLatterWithNumber = (value) =>
  value
    .replaceAll(' ', '')
    .split('')
    .some((char) => char === char.toUpperCase() && !Number.isNaN(Number(char)));

export { minLength, biggerLatterWithNumber };
