import { readFile, writeFile } from "fs";
import { decryptData, encryptData } from "./encrypt-data.js";

export const storeEncrypted = async (data, password) => {
  const encryptedData = await encryptData(data, password);

  await new Promise((resolve, reject) => writeFile('./data.txt', encryptedData, (err) => err ? reject(err) : resolve()));
}

export const getEncrypted = async (password) => {
  const data = await new Promise(
    (resolve, reject) =>
      readFile('./data.txt', 'utf-8',
        (err, data) => err ? reject(err) : resolve(data)
      )
  );
  const decrypted = await decryptData(password, data)
  return decrypted
}