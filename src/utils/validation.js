const minLength = (value) => value.length >= 7;

const biggerLatterWithNumber = (value) =>
  value
    .replaceAll(' ', '')
    .split('')
    .some((char) => char === char.toUpperCase() && !Number.isNaN(Number(char)));

const charNumber = (value) =>
  value.split('').some((char, index) => value.charCodeAt(index) >= 48 && value.charCodeAt(index) <= 57);

const strLatinAlphabet = (value) =>
  value
    .split('')
    .some(
      (char, index) =>
        (value.charCodeAt(index) >= 65 && value.charCodeAt(index) <= 90) ||
        (value.charCodeAt(index) >= 97 && value.charCodeAt(index) <= 122)
    );

export { minLength, biggerLatterWithNumber, strLatinAlphabet, charNumber };
