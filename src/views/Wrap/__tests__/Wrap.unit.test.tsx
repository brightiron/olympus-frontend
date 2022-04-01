import * as useWeb3Context from "src/hooks/web3Context";
import { mockWeb3Context } from "src/testHelpers";

import { render } from "../../../testUtils";
import Wrap from "../Wrap";

jest.mock("web3modal");
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("<Wrap/>", () => {
  it("Should show Connect Button when not Connected", () => {
    const { container } = render(<Wrap />);
    expect(container).toMatchSnapshot();
  });
  it("should Render Migrate Input Area on Avalanche", () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    data.mockReturnValue({
      ...mockWeb3Context,
      networkId: 43114,
    });

    const { container } = render(<Wrap />);

    expect(container).toMatchSnapshot();
  });
  it("should Render Migrate Input Area on Arbitrum", () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    data.mockReturnValue({
      ...mockWeb3Context,
      networkId: 42161,
    });
    const { container } = render(<Wrap />);
    expect(container).toMatchSnapshot();
  });

  it("Should Render Wrap Input Area with Wallet Connected", () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    data.mockReturnValue({
      ...mockWeb3Context,
      networkId: 1,
    });
    const { container } = render(<Wrap />);
    expect(container).toMatchSnapshot();
  });
});
