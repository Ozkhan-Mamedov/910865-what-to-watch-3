import {
  CHANGE_ACTIVE_CARD, CHANGE_FILTER_BY_GENRE, CHANGE_SERVER_STATUS,
  DECREASE_CARDS_NUMBER, INCREMENT_CARDS_NUMBER, MAX_CARD_RENDER_NUMBER,
  RENDER_PLAYER, UNRENDER_PLAYER, ADD_FILM_TO_WATCH, REMOVE_FILM_TO_WATCH
} from "../../constants";

const ActionType = {
  CHANGE_FILTER_BY_GENRE,
  CHANGE_ACTIVE_CARD,
  INCREMENT_CARDS_NUMBER,
  DECREASE_CARDS_NUMBER,
  RENDER_PLAYER,
  UNRENDER_PLAYER,
  CHANGE_SERVER_STATUS,
  ADD_FILM_TO_WATCH,
  REMOVE_FILM_TO_WATCH,
};

const ActionCreator = {
  changeFilter: (genre) => ({
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: genre
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
  changeServerStatus: (status) => ({
    type: ActionType.CHANGE_SERVER_STATUS,
    payload: status,
  }),
  addFilmToWatch: (film) => ({
    type: ActionType.ADD_FILM_TO_WATCH,
    payload: film,
  }),
  removeFilmToWatch: (film) => ({
    type: ActionType.REMOVE_FILM_TO_WATCH,
    payload: film,
  })
};

export {ActionCreator, ActionType};
