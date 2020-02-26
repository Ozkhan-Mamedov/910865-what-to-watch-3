import {reducer, ActionCreator, initialState} from "./reducer.js";
import {ALL_GENRES} from "../constants";

describe(`Reducer works correctly`, () => {
  it(`Reducer without parameters returns initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should change genre correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeFilter(`genre`))).toEqual({
      genre: `genre`,
      films: initialState.films,
    });
  });

  it(`Reducer should filter film array correctly`, () => {
    expect(reducer(initialState, ActionCreator.getFilmsByGenre(`Fantasy`))).toEqual({
      genre: ALL_GENRES,
      films: initialState.films.filter((film) => film.genre === `Fantasy`),
    });
  });
});
