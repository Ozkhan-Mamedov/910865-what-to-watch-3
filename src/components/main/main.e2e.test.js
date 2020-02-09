import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

const promoFilmData = {
  name: `name`,
  genre: `genre`,
  releaseDate: `date`,
};

const films = [
  `Film`
];

it(`Should film name link be pressed`, () => {
  const filmNameClickHandler = jest.fn();

  const mainPageScreen = shallow(
      <Main films={films} promoFilmData={promoFilmData} filmNameClickHandler={filmNameClickHandler} />
  );

  const filmNameLink = mainPageScreen.find(`.small-movie-card__link`);

  filmNameLink.props().onClick();

  expect(filmNameClickHandler.mock.calls.length).toBe(1);
});
