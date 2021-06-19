import { randomBytes } from 'crypto';
import { readFileSync } from 'fs';


const generateRandomBitString = () => {
  const bytes = [...randomBytes(256 / 8)]
  return bytes.map(byte => byte.toString(2).padStart(8, '0')).join('');
}

const generateChecksum = (bitString) => {
  return bitString.substr(0, 8);
}

const generateRandomBitsWithChecksum = () => {
  const bits = generateRandomBitString();
  const checksum = generateChecksum(bits);
  return [...`${bits}${checksum}`];
}

const getWordList = () => {
  const wordList = readFileSync('./wordlist.txt', { encoding: 'ascii' });
  return wordList.split('\r\n');
}

const bitsToMnemonic = (bits, wordList) => {
  const words = [];

  for (let i = 0; i < 24; i++) {
    const index = parseInt(bits.splice(0, 11).join(''), 2);
    words.push(wordList[index]);
  }
  return words.join(' ')
}

export const generateMnemonicPhrase = () => bitsToMnemonic(
  generateRandomBitsWithChecksum(),
  getWordList()
);
