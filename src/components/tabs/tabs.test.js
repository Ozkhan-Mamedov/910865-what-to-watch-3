import React from "react";
import renderer from "react-test-renderer";

import Tabs from "./tabs";

import {TABS_KEYS} from "../../constants";

it(`Tabs component renders correctly`, () => {
  const tree = renderer
    .create(<Tabs
      activeTab={TABS_KEYS.OVERVIEW}
      onTabClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
