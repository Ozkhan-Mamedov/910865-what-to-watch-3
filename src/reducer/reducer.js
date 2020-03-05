import {
  ALL_GENRES, CHANGE_FILTER_BY_GENRE, GET_FILMS_BY_GENRE,
  CHANGE_ACTIVE_CARD, MAX_CARD_RENDER_NUMBER, INCREMENT_CARDS_NUMBER,
  DECREASE_CARDS_NUMBER, RENDER_PLAYER, UNRENDER_PLAYER
} from "../constants";
import films from "../mocks/films";
import filmsComments from "../mocks/comments";
import extend from "../utils";

const initialState = {
  genre: ALL_GENRES,
  films,
  filmsComments,
  activeCard: -1,
  cardsRenderNumber: MAX_CARD_RENDER_NUMBER,
  isPlayerActive: false,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE,
  GET_FILMS_BY_GENRE,
  CHANGE_ACTIVE_CARD,
  INCREMENT_CARDS_NUMBER,
  DECREASE_CARDS_NUMBER,
  RENDER_PLAYER,
  UNRENDER_PLAYER,
};

const ActionCreator = {
  changeFilter: (genre) => ({
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: genre
  }),
  getFilmsByGenre: (genre) => ({
    type: ActionType.GET_FILMS_BY_GENRE,
    payload: films.filter((film) => film.genre === genre)
  }),
  changeActiveCard: (id) => ({
    type: ActionType.CHANGE_ACTIVE_CARD,
    payload: id
  }),
  incrementCardsNumber: () => ({
    type: ActionType.INCREMENT_CARDS_NUMBER,
    payload: MAX_CARD_RENDER_NUMBER
  }),
  decreaseCardsNumber: () => ({
    type: ActionType.DECREASE_CARDS_NUMBER,
    payload: MAX_CARD_RENDER_NUMBER
  }),
  renderPlayer: () => ({
    type: ActionType.RENDER_PLAYER,
    payload: true
  }),
  unrenderPlayer: () => ({
    type: ActionType.RENDER_PLAYER,
    payload: false
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_FILTER_BY_GENRE:
      return extend(state, {
        genre: action.payload,
      });

    case ActionType.GET_FILMS_BY_GENRE:
      return extend(state, {
        films: action.payload,
      });

    case ActionType.CHANGE_ACTIVE_CARD:
      return extend(state, {
        activeCard: action.payload,
      });

    case ActionType.INCREMENT_CARDS_NUMBER:
      return extend(state, {
        cardsRenderNumber: state.cardsRenderNumber + action.payload,
      });

    case ActionType.DECREASE_CARDS_NUMBER:
      return extend(state, {
        cardsRenderNumber: action.payload,
      });

    case ActionType.RENDER_PLAYER:
      return extend(state, {
        isPlayerActive: action.payload,
      });

    case ActionType.UNRENDER_PLAYER:
      return extend(state, {
        isPlayerActive: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
