import {reducer, ActionCreator, initialState} from "./reducer.js";
import {ALL_GENRES, MAX_CARD_RENDER_NUMBER} from "../constants";

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
      cardsRenderNumber: initialState.cardsRenderNumber,
    });
  });

  it(`Reducer should filter film array correctly`, () => {
    expect(reducer(initialState, ActionCreator.getFilmsByGenre(`Fantasy`))).toEqual({
      genre: ALL_GENRES,
      films: initialState.films.filter((film) => film.genre === `Fantasy`),
      activeCard: initialState.activeCard,
      filmsComments: initialState.filmsComments,
      cardsRenderNumber: initialState.cardsRenderNumber,
    });
  });

  it(`Reducer should change active card correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeActiveCard(1))).toEqual({
      genre: initialState.genre,
      films: initialState.films,
      filmsComments: initialState.filmsComments,
      activeCard: 1,
      cardsRenderNumber: initialState.cardsRenderNumber,
    });
  });

  it(`Reducer should change cards render number correctly`, () => {
    expect(reducer(initialState, ActionCreator.incrementCardsNumber())).toEqual({
      genre: initialState.genre,
      films: initialState.films,
      filmsComments: initialState.filmsComments,
      activeCard: initialState.activeCard,
      cardsRenderNumber: MAX_CARD_RENDER_NUMBER * 2,
    });
  });
});
