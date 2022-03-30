import { fireEvent } from "@testing-library/dom";
import { MockProvider } from "ethereum-waffle";
import * as useWeb3Context from "src/hooks/web3Context";
import { ReactQueryProvider } from "src/lib/react-query";

import { render, screen } from "../../../testUtils";
import Stake from "../Stake";

beforeEach(() => {
  jest.restoreAllMocks();
});
describe("<Stake/>", () => {
  const provider = new MockProvider();
  it("should render component", async () => {
    const { container } = await render(
      <ReactQueryProvider>
        <Stake />
      </ReactQueryProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it("should render the stake Input Area when connected", async () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    const testing = data.mockReturnValue({
      ...data.mock.results,
      provider,
      networkId: 1,
      connected: true,
    });
    const { container } = await render(
      <ReactQueryProvider>
        <Stake />
      </ReactQueryProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it("should render gOHM conversion when toggling to gOHM", async () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    const testing = data.mockReturnValue({
      ...data.mock.results,
      provider,
      networkId: 1,
      connected: true,
    });
    const { container } = await render(
      <ReactQueryProvider>
        <Stake />
      </ReactQueryProvider>,
    );
    fireEvent.click(screen.getByLabelText("stake to gohm"));
    expect(container).toMatchSnapshot();
  });

  it("should render correct staking headers", async () => {
    const { container } = await render(
      <ReactQueryProvider>
        <Stake />
      </ReactQueryProvider>,
    );
    // there should be a header inviting user to Stake
    expect(await screen.getByText("Single Stake (3, 3)")).toBeInTheDocument();
    //  there should be a Farm Pool table
    expect(await screen.getByText("Farm Pool")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render all supported multi chain staking contracts", async () => {
    const { container } = await render(
      <ReactQueryProvider>
        <Stake />
      </ReactQueryProvider>,
    );
    expect(await screen.getByText("gOHM-AVAX")).toBeInTheDocument();
    expect(await screen.getByText("Stake on Trader Joe").closest("a")).toHaveAttribute(
      "href",
      "https://traderjoexyz.com/farm/0xB674f93952F02F2538214D4572Aa47F262e990Ff-0x188bED1968b795d5c9022F6a0bb5931Ac4c18F00",
    );
    // there should be two sushi contracts, one on Arbitrum and the other on Polygon
    const sushiContracts = await screen.findAllByText("gOHM-wETH");
    expect(sushiContracts).toHaveLength(3);
    expect(await screen.getByText("gOHM-FTM")).toBeInTheDocument();
    expect(await screen.getByText("Stake on Spirit").closest("a")).toHaveAttribute(
      "href",
      "https://app.spiritswap.finance/#/farms/allfarms",
    );
  });
});
