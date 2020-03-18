import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import VideoPlayer from "./video-player";

import withVideoPlayerStatus from "../../hocs/withVideoPlayerStatus";

Enzyme.configure({
  adapter: new Adapter(),
});

const film = {
  name: `Film#1`,
  picture: `picture#1`,
  genre: `genre#1`,
  id: 1,
  releaseDate: `2020`,
  ratingScore: 1,
  ratingsNumber: 2,
  director: `Director#1`,
  starring: [`Actor#1`, `Actor#2`, `Actor#3`, `Actor#4`],
  description: `Test paragraph #1.`,
  preview: `preview#1`,
  runTime: 130,
  previewImage: `preview image#1`,
  videoLink: `video link#1`,
  isFavorite: false,
  backgroundColor: `background color#1`,
  backgroundImage: `background image#1`,
};

describe(`Should VideoPlayer work correctly`, () => {
  const VideoPlayerWrapper = withVideoPlayerStatus(VideoPlayer);
  const wrapper = mount(<VideoPlayerWrapper src={film.preview} poster={film.picture} />);
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
