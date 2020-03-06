import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";

import PromoMovieCard from "./promo-movie-card";

import {reducer} from "../../reducer/reducer";

const promoFilmData = {
  name: `name`,
  genre: `genre`,
  releaseDate: `date`,
  src: `source`,
  runTime: 10,
};

it(`PromoMovieCard component renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(reducer)}>
          <PromoMovieCard promoFilm={promoFilmData} />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
