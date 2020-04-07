import React from "react";
import renderer from "react-test-renderer";

import Tabs from "./tabs";

import {TabKey} from "../../constants";

it(`Tabs component renders correctly`, () => {
  const tree = renderer
    .create(<Tabs
      activeTab={TabKey.OVERVIEW}
      onTabClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
