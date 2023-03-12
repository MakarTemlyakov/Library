const minLength = (value) => value.length >= 7;

const isCharNumber = (value) => value.split('').some((char) => !Number.isNaN(Number(char)));

const isBiggerLatter = (value) =>
  value
    .replaceAll(' ', '')
    .split('')
    .some((char, index) => !isCharNumber(char) && value.charCodeAt(index) === value.toUpperCase().charCodeAt(index));

const strLatinAlphabet = (value) =>
  value
    .split('')
    .some(
      (char, index) =>
        (value.charCodeAt(index) >= 65 && value.charCodeAt(index) <= 90) ||
        (value.charCodeAt(index) >= 97 && value.charCodeAt(index) <= 122)
    );

const isEmail = (value) => {
  const regExp = new RegExp('^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$');

  return regExp.test(value);
};

const isPhone = (value) => {
  // eslint-disable-next-line no-useless-escape
  const regExp1 = new RegExp(/\+375 \(\d{2}\) ([0-9]{3})\-([0-9]{2})\-([0-9]{2})/);

  return regExp1.test(value);
};

export { minLength, isBiggerLatter, strLatinAlphabet, isCharNumber, isEmail, isPhone };
