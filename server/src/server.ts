import log from "./log";
import { initialize } from "./methods/intialize";

interface Message {
  jsonrpc: string;
}

export interface RequestMessage extends Message {
  id: number | string;
  method: string;
  params?: unknown[] | object;
}

let buffer = "";
process.stdin.on("data", (chunk) => {
  buffer += chunk;

  while (true) {
    // Check for the Content-Length line
    const lengthMatch = buffer.match(/Content-Length: (\d+)\r\n/);
    if (!lengthMatch) break;

    const contentLength = parseInt(lengthMatch[1], 10);
    const messageStart = buffer.indexOf("\r\n\r\n") + 4;

    // Continue unless the full message is in the buffer
    if (buffer.length < messageStart + contentLength) break;

    const rawMessage = buffer.slice(messageStart, messageStart + contentLength);
    const message = JSON.parse(rawMessage);

    log.write({ id: message.id, method: message.method });

    // Call method and respond

    // Remove all the processed message from the buffer
    buffer = buffer.slice(messageStart + contentLength);
  }
});
