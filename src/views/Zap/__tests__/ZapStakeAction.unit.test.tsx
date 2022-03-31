import { configureStore } from "@reduxjs/toolkit";
import { fireEvent } from "@testing-library/dom";
import { MockProvider } from "ethereum-waffle";
import * as useWeb3Context from "src/hooks/web3Context";
import appReducer from "src/slices/AppSlice";
import zapReducer from "src/slices/ZapSlice";
import Web3Modal from "web3modal";

import { render, screen } from "../../../testUtils";
import ZapStakeAction from "../ZapStakeAction";

jest.mock("web3modal"),
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

describe("<ZapStakeAction/> ", () => {
  const provider = new MockProvider();

  it("Submit Button Should be disabled with < 2 tokens selected enabled with two selected", async () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    data.mockReturnValue({
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
    });
    // preload user account with v1 ohm, sohm and wsohm tokens
    // and test migration flow
    const preloadedState = {
      zap: {
        allowances: {},
        balancesLoading: false,
        changeAllowanceLoading: false,
        stakeLoading: false,
        balances: {
          dai: {
            hide: false,
            type: "base",
            network: "ethereum",
            address: "0x6b175474e89094c44da98b954eedeac495271d0f",
            decimals: 18,
            symbol: "DAI",
            price: 0.998646,
            balance: 10000,
            balanceRaw: "10000",
            balanceUSD: 10000.0,
            tokenImageUrl:
              "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x6b175474e89094c44da98b954eedeac495271d0f.png",
          },
          eth: {
            hide: false,
            type: "base",
            network: "ethereum",
            address: "0x0000000000000000000000000000000000000000",
            decimals: 18,
            symbol: "ETH",
            price: 3397.72,
            balance: 1,
            balanceRaw: "1",
            balanceUSD: 3397.72,
            tokenImageUrl:
              "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
          },
        },
      },
    };
    // use only reducers required for this component test
    const reducer = {
      app: appReducer,
      zap: zapReducer,
    };

    const store = configureStore({
      reducer,
      devTools: true,
      preloadedState,
    }) as any; //eslint-disable-line
    const stakeAction = <ZapStakeAction />;

    const { container } = render(stakeAction, store);
    fireEvent.click(await screen.findByTestId("zap-input"));
    fireEvent.click(await screen.getAllByText("ETH")[0]);
    fireEvent.input(await screen.findByTestId("zap-amount-input"), { target: { value: "1" } });
    expect(await screen.findByText("Minimum Output Amount: 0.5"));
    fireEvent.click(await screen.findByTestId("zap-output"));
    fireEvent.click(await screen.getByText("gOHM"));
    fireEvent.input(await screen.findByTestId("zap-amount-input"), { target: { value: "1" } });
    expect(await screen.findByText("Zap-Stake"));
    expect(container).toMatchSnapshot();
  }, 10000);
});
