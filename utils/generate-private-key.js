import pbkdf2Hmac from "pbkdf2-hmac";

export const generatePrivateKey = async (mnemonic) => {
  const byteArray = await pbkdf2Hmac(mnemonic, 'mnemonic', 2048, 64, 'SHA-512');
  return [...new Uint8Array(byteArray)].map(x => x.toString(16).padStart(2, '0')).join('')
}