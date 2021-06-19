import {
  scrypt,
  randomFill,
  createCipheriv,
  scryptSync,
  randomFillSync,
  createDecipheriv
} from 'crypto';

const algorithm = 'aes-192-cbc';
const salt = 'super secret salt';

export const encryptData = (data, password) => new Promise((resolve, reject) => {
  const key = scryptSync(password, salt, 24)

  const iv = randomFillSync(new Uint8Array(16));

  const cipher = createCipheriv(algorithm, key, iv);

  let encrypted = '';
  cipher.setEncoding('hex');

  cipher.on('data', (chunk) => encrypted += chunk);
  cipher.on('error', reject)
  cipher.on('end', () => resolve(encrypted + [...iv].map(x => x.toString(16).padStart(2, '0')).join('')));

  cipher.write(data);
  cipher.end();
});

export const decryptData = (password, encryptedDataWithIV) => new Promise((resolve, reject) => {
  const key = scryptSync(password, salt, 24);

  const encryptedArray = [...encryptedDataWithIV]

  const iv = encryptedArray.splice(-32, 32).join('')
  const encryptedData = encryptedArray.join('')

  const decipher = createDecipheriv(algorithm, key, Uint8Array.from(Buffer.from(iv, 'hex')));

  let decrypted = '';
  decipher.on('readable', (chunk) => {
    while (null !== (chunk = decipher.read())) {
      decrypted += chunk.toString('utf8');
    }
  });
  decipher.on('error', reject)
  decipher.on('end', () => {
    resolve(decrypted)
  });

  // Encrypted with same algorithm, key and iv.
  decipher.write(encryptedData, 'hex');
  decipher.end();
});