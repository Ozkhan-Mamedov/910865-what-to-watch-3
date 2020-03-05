import React from "react";
import renderer from "react-test-renderer";

import FullscreenVideoPlayer from "./fullscreen-video-player";

const film =
  {
    name: `Film#1`,
    picture: `picture#1`,
    genre: `genre#1`,
    id: 1,
    releaseDate: `2020`,
    ratingScore: 1,
    ratingsNumber: 2,
    director: `Director`,
    starring: [`Actor#1`, `Actor#2`, `Actor#3`],
    description: [`Test paragraph #1.`, `Test paragraph #2.`],
    preview: `preview link`,
  };

it(`FullscreenVideoPlayer component renders correctly`, () => {
  const tree = renderer
    .create(
        <FullscreenVideoPlayer film={film} onExitButtonClickHandler={() => {}}/>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
