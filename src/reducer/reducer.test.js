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
      activeCard: initialState.activeCard,
      filmsComments: initialState.filmsComments,
    });
  });

  it(`Reducer should filter film array correctly`, () => {
    expect(reducer(initialState, ActionCreator.getFilmsByGenre(`Fantasy`))).toEqual({
      genre: ALL_GENRES,
      films: initialState.films.filter((film) => film.genre === `Fantasy`),
      activeCard: initialState.activeCard,
      filmsComments: initialState.filmsComments,
    });
  });

  it(`Reducer should change active card correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeActiveCard(1))).toEqual({
      genre: initialState.genre,
      films: initialState.films,
      filmsComments: initialState.filmsComments,
      activeCard: 1,
    });
  });
});
