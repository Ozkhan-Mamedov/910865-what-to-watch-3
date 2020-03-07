import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SmallMovieCard from "./small-movie-card";

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

describe(`Should SmallMovieCard work correctly`, () => {
  const filmNameClickHandler = jest.fn();
  const cardHoverHandler = jest.fn();

  const smallMovieComponent = shallow(
      <SmallMovieCard film={film} filmNameClickHandler={filmNameClickHandler}
        cardHoverHandler={cardHoverHandler} activeCard={-1}/>
  );

  const movieCard = smallMovieComponent.find(`.small-movie-card`);

  it(`Should hover correctly`, () => {
    movieCard.simulate(`mouseover`);

    setTimeout(() => expect(cardHoverHandler).toHaveBeenCalledWith(1), 1000);
  });

  it(`Should remove hover correctly`, () => {
    movieCard.simulate(`mouseout`);

    expect(cardHoverHandler).toHaveBeenCalledWith(-1);
  });

  it(`Should film card be pressed`, () => {
    movieCard.props().onClick({
      preventDefault: () => {
      }
    });

    expect(filmNameClickHandler.mock.calls.length).toBe(1);
  });

  it(`Should film card return correct value`, () => {
    movieCard.simulate(`click`, {
      preventDefault: () => {
      }
    });

    expect(filmNameClickHandler).toHaveBeenCalledWith(1);
  });
});
