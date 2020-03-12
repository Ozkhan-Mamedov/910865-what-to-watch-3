import {reducer} from "./reducer";
import {ActionCreator} from "./action-creator";
import initialState from "./initial-state";
import {MAX_CARD_RENDER_NUMBER} from "../../constants";

const initialStateForFilmToWatchList = {
  genre: `genre`,
  activeCard: initialState.activeCard,
  cardsRenderNumber: initialState.cardsRenderNumber,
  isPlayerActive: initialState.isPlayerActive,
  isServerAvailable: initialState.isServerAvailable,
  filmsToWatch: [{
    name: `Film`,
  }]
};

describe(`Reducer works correctly`, () => {
  it(`Reducer without parameters returns initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should change genre correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeFilter(`genre`))).toEqual({
      genre: `genre`,
      activeCard: initialState.activeCard,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isPlayerActive: initialState.isPlayerActive,
      isServerAvailable: initialState.isServerAvailable,
      filmsToWatch: initialState.filmsToWatch
    });
  });

  it(`Reducer should change active card correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeActiveCard(1))).toEqual({
      genre: initialState.genre,
      activeCard: 1,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isPlayerActive: initialState.isPlayerActive,
      isServerAvailable: initialState.isServerAvailable,
      filmsToWatch: initialState.filmsToWatch
    });
  });

  it(`Reducer should change cards render number correctly`, () => {
    expect(reducer(initialState, ActionCreator.incrementCardsNumber())).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: MAX_CARD_RENDER_NUMBER * 2,
      isPlayerActive: initialState.isPlayerActive,
      isServerAvailable: initialState.isServerAvailable,
      filmsToWatch: initialState.filmsToWatch
    });
  });

  it(`Reducer should return initial cards render number correctly`, () => {
    expect(reducer(initialState, ActionCreator.decreaseCardsNumber())).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: MAX_CARD_RENDER_NUMBER,
      isPlayerActive: initialState.isPlayerActive,
      isServerAvailable: initialState.isServerAvailable,
      filmsToWatch: initialState.filmsToWatch
    });
  });

  it(`Reducer should change rendered player status correctly`, () => {
    expect(reducer(initialState, ActionCreator.renderPlayer())).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isPlayerActive: true,
      isServerAvailable: initialState.isServerAvailable,
      filmsToWatch: initialState.filmsToWatch
    });
  });

  it(`Reducer should change unrendered player status correctly`, () => {
    expect(reducer(initialState, ActionCreator.unrenderPlayer())).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isPlayerActive: false,
      isServerAvailable: initialState.isServerAvailable,
      filmsToWatch: initialState.filmsToWatch
    });
  });

  it(`Reducer should change server status to false correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeServerStatus(false))).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isPlayerActive: initialState.isPlayerActive,
      isServerAvailable: false,
      filmsToWatch: initialState.filmsToWatch
    });
  });

  it(`Reducer should change server status to true correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeServerStatus(true))).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isPlayerActive: initialState.isPlayerActive,
      isServerAvailable: true,
      filmsToWatch: initialState.filmsToWatch
    });
  });

  it(`Reducer should add film to watch list correctly`, () => {
    expect(reducer(initialState, ActionCreator.addFilmToWatch({
      name: `Film`,
    }))).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isPlayerActive: initialState.isPlayerActive,
      isServerAvailable: initialState.isServerAvailable,
      filmsToWatch: [{
        name: `Film`,
      }]
    });
  });

  it(`Reducer should remove film to watch list correctly`, () => {
    expect(reducer(initialStateForFilmToWatchList, ActionCreator.removeFilmToWatch({
      name: `Film`
    }))).toEqual({
      genre: initialStateForFilmToWatchList.genre,
      activeCard: initialStateForFilmToWatchList.activeCard,
      cardsRenderNumber: initialStateForFilmToWatchList.cardsRenderNumber,
      isPlayerActive: initialStateForFilmToWatchList.isPlayerActive,
      isServerAvailable: initialStateForFilmToWatchList.isServerAvailable,
      filmsToWatch: []
    });
  });
});
