import read from 'read'
import { Command } from "commander";
import { generateMnemonicPhrase } from "../utils/generate-mnemonic.js";
import { storeEncrypted } from '../utils/store-encrypted.js';

export const mnemonic = (new Command('mnemonic'))
  .description('Generates a new mnemonic passphrase')
  .option('-s --store', 'store the mnemonic in an encrypted file. Must include a password')
  .action(async (options, command) => {
    console.log('generating mnemonic phrase...')
    const mnemonic = generateMnemonicPhrase()
    console.log('your mnemonic phrase, DO NOT LOSE THIS there is NO WAY to recover it\n\n')
    console.log(mnemonic)
    console.log('\n')
    if (options.store) {
      const password = await new Promise((resolve, reject) => {
        read(
          {
            silent: true,
            prompt: "\n\nPlease enter a password: "
          },
          (err, result) => err ? reject(err) : resolve(result)
        )
      })

      await storeEncrypted(mnemonic, password);

      console.log('\nYour mnemonic code was successfully saved')
    }
  })