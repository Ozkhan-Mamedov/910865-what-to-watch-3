import React from "react";
import renderer from "react-test-renderer";

import PromoMovieCard from "./promo-movie-card";

const promoFilmData = {
  name: `name`,
  genre: `genre`,
  releaseDate: `date`,
};

it(`PromoMovieCard component renders correctly`, () => {
  const tree = renderer
    .create(
        <PromoMovieCard promoFilm={promoFilmData} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
