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
    releaseDate: `2025`,
    ratingScore: 2,
    ratingsNumber: 5,
    director: `Director#2`,
    starring: [`Actor#1`, `Actor#2`, `Actor#3`],
    description: [`Test paragraph #1.`, `Test paragraph #2.`],
  };

describe(`Should SmallMovieCard work correctly`, () => {
  const filmNameClickHandler = jest.fn();
  const cardHoverHandler = jest.fn();

  const smallMovieComponent = shallow(
      <SmallMovieCard film={film} filmNameClickHandler={filmNameClickHandler}
        cardHoverHandler={cardHoverHandler} />
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

    filmNameLink.props().onClick({
      preventDefault: () => {
      }
    });

    expect(filmNameClickHandler.mock.calls.length).toBe(1);
  });

  it(`Should film name link return correct value`, () => {
    const filmNameLink = movieCard.find(`.small-movie-card__link`);

    filmNameLink.simulate(`click`, {
      preventDefault: () => {
      }
    });

    expect(filmNameClickHandler).toHaveBeenCalledWith(`Film#1`);
    filmNameClickHandler.mockClear();
  });

  it(`Should film image be pressed`, () => {
    const filmImage = movieCard.find(`.small-movie-card__image img`);

    filmImage.props().onClick();

    expect(filmNameClickHandler.mock.calls.length).toBe(1);
  });

  it(`Should film image return correct value`, () => {
    const filmImage = movieCard.find(`.small-movie-card__image`);

    filmImage.simulate(`click`);

    expect(filmNameClickHandler).toHaveBeenCalledWith(`Film#1`);
  });
});
