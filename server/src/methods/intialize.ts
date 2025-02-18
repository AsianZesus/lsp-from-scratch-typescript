import { RequestMessage } from "../server";
type ServerCapabilities = Record<string, unknown>;

interface InitializeResult {
  capabilities: ServerCapabilities;

  serverInfo?: {
    name: string;
    version?: string;
  };
}

export const initialize = (message: RequestMessage): InitializeResult => {
  return {
    capabilities: {},
    serverInfo: {
      name: "lsp-from-scratch-typescript",
      version: "0.0.1",
    },
  };
};
