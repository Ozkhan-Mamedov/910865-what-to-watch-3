import React from "react";
import renderer from "react-test-renderer";

import VideoPlayer from "./video-player";

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

it(`VideoPlayer component renders correctly`, () => {
  const tree = renderer
    .create(<VideoPlayer src={film.preview} poster={film.picture} />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
