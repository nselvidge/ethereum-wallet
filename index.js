import { program } from 'commander';
import { mnemonic } from './commands/mnemonic.js';
import { privateKey } from './commands/private-key.js';

// generatePrivateKey(mnemonic).then(console.log);

program
  .addCommand(mnemonic)
  .addCommand(privateKey)

program.parse(process.argv)