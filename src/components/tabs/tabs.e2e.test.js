import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Tabs from "./tabs";

import {TabKey} from "../../constants";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Should tabs ActiveTab work correctly`, () => {
  const handleTabClick = jest.fn();
  const wrapper = mount(<Tabs activeTab={TabKey.OVERVIEW} onTabClick={handleTabClick}/>);
  const activeElement = wrapper.find(`.movie-nav__item--active`);

  it(`Tabs ActiveClass change should be correct`, () => {
    expect(activeElement.instance()).not.toBeNull();

    const overviewTab = wrapper.find(`.movie-nav__item`).at(1).simulate(`click`);

    expect(overviewTab.hasClass(`movie-nav__item--active`));
  });
});
