import { BondV2 } from "src/views";

import { render } from "../../../testUtils";

describe("<BondV2/>", () => {
  it("should render component", () => {
    const { container } = render(<BondV2 index={0} inverseBond={false} />);
    expect(container).toMatchSnapshot();
  });
});
