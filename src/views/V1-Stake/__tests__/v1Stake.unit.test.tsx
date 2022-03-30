import { MockProvider } from "ethereum-waffle";
import * as useWeb3Context from "src/hooks/web3Context";

import { render } from "../../../testUtils";
import V1Stake from "../V1-Stake";

beforeEach(() => {
  jest.restoreAllMocks();
});
describe("<Stake/>", () => {
  const provider = new MockProvider();
  it("should render component. not connected", async () => {
    const { container } = await render(
      <V1Stake oldAssetsDetected={false} setMigrationModalOpen={false} hasActiveV1Bonds={false} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should render the stake input Area when connected", async () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    const testing = data.mockReturnValue({
      ...data.mock.results,
      provider,
      networkId: 1,
      connected: true,
    });
    const { container } = await render(
      <V1Stake oldAssetsDetected={false} setMigrationModalOpen={false} hasActiveV1Bonds={false} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should render the v1 migration modal", async () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    const testing = data.mockReturnValue({
      ...data.mock.results,
      provider,
      networkId: 1,
      connected: true,
    });
    const { container } = await render(
      <V1Stake oldAssetsDetected={false} setMigrationModalOpen={true} hasActiveV1Bonds={false} />,
    );
    expect(container).toMatchSnapshot();
  });
  it("should render the v1 migration modal and banner", async () => {
    const data = jest.spyOn(useWeb3Context, "useWeb3Context");
    const testing = data.mockReturnValue({
      ...data.mock.results,
      provider,
      networkId: 1,
      connected: true,
    });
    const { container } = await render(
      <V1Stake oldAssetsDetected={true} setMigrationModalOpen={true} hasActiveV1Bonds={false} />,
    );
    expect(container).toMatchSnapshot();
  });
});
