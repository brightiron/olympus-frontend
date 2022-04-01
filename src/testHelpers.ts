import { MockProvider } from "ethereum-waffle";
import Web3Modal from "web3modal";

jest.mock("web3modal");

const provider = new MockProvider();

export const mockWeb3Context = {
  connected: true,
  networkId: 1,
  provider,
  connect: jest.fn(),
  disconnect: jest.fn(),
  address: "0x0000000000000000000000000000000000000000",
  hasCachedProvider: jest.fn(() => true),
  connectionError: null,
  networkName: "mainnet",
  providerUri: "http://localhost:8545",
  providerInitialized: true,
  web3Modal: new Web3Modal(),
};
