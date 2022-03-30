import { render } from "../../../testUtils";
import SelectTokenModal from "../SelectTokenModal";
import Zap from "../Zap";
import ZapStakeAction from "../ZapStakeAction";

describe("<Zap/>", () => {
  it("should render component", () => {
    const { container } = render(<Zap />);
    expect(container).toMatchSnapshot();
  });
});

describe("<ZapStakeAction/>", () => {
  it("should render component", () => {
    const { container } = render(<ZapStakeAction />);
    expect(container).toMatchSnapshot();
  });
});

describe("SelectTokenModal", () => {
  it("should render output modal", () => {
    const handleSelectZapToken = () => {
      return false;
    };
    const { container } = render(
      SelectTokenModal(
        () => {
          return false;
        },
        true,
        false,
        handleSelectZapToken,
        <></>,
        {
          output: true,
        },
      ),
    );
    expect(container).toMatchSnapshot();
  });

  it("should render modal with tokens", () => {
    const tokens = {
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
    };

    const handleSelectZapToken = () => {
      return false;
    };
    const { container } = render(
      SelectTokenModal(
        () => {
          return false;
        },
        true,
        false,
        handleSelectZapToken,
        <></>,
        {
          regularTokens: tokens,
        },
      ),
    );
    expect(container).toMatchSnapshot();
  });
});
