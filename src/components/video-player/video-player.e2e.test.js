import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import VideoPlayer from "./video-player";

Enzyme.configure({
  adapter: new Adapter(),
});

const film =
  {
    name: `Film#1`,
    picture: `picture#1`,
    genre: `genre#1`,
    id: 1,
    releaseDate: `2025`,
    ratingScore: 2,
    ratingsNumber: 5,
    director: `Director#2`,
    starring: [`Actor#1`, `Actor#2`, `Actor#3`],
    description: [`Test paragraph #1.`, `Test paragraph #2.`],
    preview: `preview link`,
  };

describe(`Should VideoPlayer work correctly`, () => {
  const wrapper = mount(<VideoPlayer src={film.preview} poster={film.picture} />);
  const videoElement = wrapper.find(`video`);

  it(`Initial state should be correct`, () => {
    expect(videoElement.instance()).not.toBeNull();
    expect(wrapper.state(`isPaused`)).toBe(true);
    expect(wrapper.state(`isPlaying`)).toBe(false);
  });

  it(`Mouse over state should change correctly`, () => {
    videoElement.simulate(`mouseover`);
    setTimeout(() => {
      expect(wrapper.state(`isPaused`)).toBe(false);
      expect(wrapper.state(`isPlaying`)).toBe(true);
    }, 1000);
  });

  it(`Mouse out state should change correctly`, () => {
    videoElement.simulate(`mouseout`);
    expect(wrapper.state(`isPaused`)).toBe(true);
    expect(wrapper.state(`isPlaying`)).toBe(false);
  });
});
