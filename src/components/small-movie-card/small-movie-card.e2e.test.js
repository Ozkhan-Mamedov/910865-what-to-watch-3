import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SmallMovieCard from "./small-movie-card";

Enzyme.configure({
  adapter: new Adapter(),
});

const film =
  {
    name: `Film#1`,
    picture: `picture#1`,
    genre: `genre#1`,
    id: 1,
  };

describe(`Should SmallMovieCard work correctly`, () => {
  const filmNameClickHandler = jest.fn();
  const cardHoverHandler = jest.fn();

  const smallMovieComponent = shallow(
      <SmallMovieCard film={film} filmNameClickHandler={filmNameClickHandler}
        cardHoverHandler={cardHoverHandler}/>
  );

  const movieCard = smallMovieComponent.find(`.small-movie-card`);

  it(`Should hover correctly`, () => {
    movieCard.simulate(`mouseover`);

    expect(cardHoverHandler).toHaveBeenCalledWith(1);
  });

  it(`Should remove hover correctly`, () => {
    movieCard.simulate(`mouseout`);

    expect(cardHoverHandler).toHaveBeenCalledWith(-1);
  });

  it(`Should film name link be pressed`, () => {
    const filmNameLink = movieCard.find(`.small-movie-card__link`);

    filmNameLink.props().onClick();

    expect(filmNameClickHandler.mock.calls.length).toBe(1);
  });
});
