import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Tabs from "./tabs";

import {TABS_KEYS} from "../../constants";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Should ActiveTab work correctly`, () => {
  const onTabClickHandler = jest.fn();
  const wrapper = mount(<Tabs activeTab={TABS_KEYS.REVIEWS} onTabClick={onTabClickHandler}/>);
  const activeElement = wrapper.find(`.movie-nav__item--active`);

  it(`ActiveClass change should be correct`, () => {
    expect(activeElement.instance()).not.toBeNull();

    const overviewTab = wrapper.find(`.movie-nav__item`).at(0).simulate(`click`);

    expect(overviewTab.hasClass(`movie-nav__item--active`));
  });
});
