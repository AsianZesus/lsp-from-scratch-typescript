import * as fs from "fs";
// C:/Users/awalr/Code/LSP/lsp-from-scratch-typescript/tmp/lsp.log
const log = fs.createWriteStream("C:/Users/awalr/Code/LSP/lsp-from-scratch-typescript/tmp/lsp.log");

export default {
  write: (message: object | unknown) => {
    if (typeof message === "object") {
      log.write(JSON.stringify(message));
    } else {
      log.write(message);
    }
    log.write("\n");
  },
};
