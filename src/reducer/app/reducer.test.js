import {reducer} from "./reducer";
import {ActionCreator} from "./action-creator";
import initialState from "./initial-state";
import {MAX_CARD_RENDER_NUMBER} from "../../constants";

describe(`Reducer works correctly`, () => {
  it(`Reducer without parameters returns initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should change genre correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeFilter(`genre`))).toEqual({
      genre: `genre`,
      activeCard: initialState.activeCard,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isServerAvailable: initialState.isServerAvailable,
    });
  });

  it(`Reducer should change active card correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeActiveCard(1))).toEqual({
      genre: initialState.genre,
      activeCard: 1,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isServerAvailable: initialState.isServerAvailable,
    });
  });

  it(`Reducer should change cards render number correctly`, () => {
    expect(reducer(initialState, ActionCreator.incrementCardsNumber())).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: MAX_CARD_RENDER_NUMBER * 2,
      isServerAvailable: initialState.isServerAvailable,
    });
  });

  it(`Reducer should return initial cards render number correctly`, () => {
    expect(reducer(initialState, ActionCreator.decreaseCardsNumber())).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: MAX_CARD_RENDER_NUMBER,
      isServerAvailable: initialState.isServerAvailable,
    });
  });

  it(`Reducer should change server status to false correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeServerStatus(false))).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isServerAvailable: false,
    });
  });

  it(`Reducer should change server status to true correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeServerStatus(true))).toEqual({
      genre: initialState.genre,
      activeCard: initialState.activeCard,
      cardsRenderNumber: initialState.cardsRenderNumber,
      isServerAvailable: true,
    });
  });
});
