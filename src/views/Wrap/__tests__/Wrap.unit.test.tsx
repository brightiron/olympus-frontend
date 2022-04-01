import { MockProvider } from "ethereum-waffle";
import * as useWeb3Context from "src/hooks/web3Context";

import { render } from "../../../testUtils";
import Wrap from "../Wrap";

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});
describe("<Wrap/>", () => {
  const provider = new MockProvider();
  it("Should show Connect Button when not Connected", () => {
    const { container } = render(<Wrap />);
    expect(container).toMatchSnapshot();
  });
  it("should Render Migrate Input Area on Avalanche", () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    const testing = data.mockReturnValue({
      ...data.mock.results,
      provider,
      networkId: 43114,
      connected: true,
    });

    const { container } = render(<Wrap />);

    expect(container).toMatchSnapshot();
  });
  it("should Render Migrate Input Area on Arbitrum", () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    const testing = data.mockReturnValue({ ...data.mock.results, provider, networkId: 42161, connected: true });
    const { container } = render(<Wrap />);
    expect(container).toMatchSnapshot();
  });

  it("Should Render Wrap Input Area with Wallet Connected", () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    const testing = data.mockReturnValue({ ...data.mock.results, provider, networkId: 1, connected: true });
    const { container } = render(<Wrap />);
    expect(container).toMatchSnapshot();
  });
});
