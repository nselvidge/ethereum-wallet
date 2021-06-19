import { Command } from 'commander';
import read from 'read'
import { generatePrivateKey } from '../utils/generate-private-key.js';
import { getEncrypted } from '../utils/store-encrypted.js';

export const privateKey = (new Command('private-key'))
  .option('-m --mnemonic <value>', 'your mnemonic code used to generate your key')
  .action(async (options) => {
    let mnemonic = options.mnemonic
    if (!mnemonic) {
      const password = await new Promise((resolve, reject) => {
        read(
          {
            silent: true,
            prompt: "Please enter your password to access stored mnemonic: "
          },
          (err, result) => err ? reject(err) : resolve(result)
        )
      })
      try {
        mnemonic = await getEncrypted(password);
      } catch (err) {
        if (err.reason === 'bad decrypt') {
          console.log('Your password was incorrect.');
          return;
        }
        console.log('Something went wrong when trying to retrieve your mnemonic');
      }
    }
    console.log(await generatePrivateKey(mnemonic));
  });
