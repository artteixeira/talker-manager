const validCharacters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateRandomToken = (length) => Array.from({ length }).reduce((acc) => {
  const randomIndex = Math.floor(Math.random() * validCharacters.length);
  return acc + validCharacters.charAt(randomIndex);
}, '');

module.exports = generateRandomToken;