import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {createStore} from "redux";

import PromoMovieCard from "./promo-movie-card";

import reducer from "../../reducer/reducer";
import history from "../../history";

const promoFilmData = {
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

it(`PromoMovieCard component renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <Router history={history}>
            <PromoMovieCard promoFilm={promoFilmData} loginButtonClickHandler={() => {}} />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
