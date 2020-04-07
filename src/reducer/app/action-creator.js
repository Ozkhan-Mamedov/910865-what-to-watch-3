import {
  CHANGE_ACTIVE_CARD, CHANGE_FILTER_BY_GENRE, CHANGE_SERVER_STATUS,
  DECREASE_CARDS_NUMBER, INCREASE_CARDS_NUMBER, MAX_CARD_RENDER_NUMBER,
} from "../../constants";

const ActionType = {
  CHANGE_FILTER_BY_GENRE,
  CHANGE_ACTIVE_CARD,
  INCREASE_CARDS_NUMBER,
  DECREASE_CARDS_NUMBER,
  CHANGE_SERVER_STATUS,
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
  increaseCardsNumber: () => ({
    type: ActionType.INCREASE_CARDS_NUMBER,
    payload: MAX_CARD_RENDER_NUMBER
  }),
  decreaseCardsNumber: () => ({
    type: ActionType.DECREASE_CARDS_NUMBER,
    payload: MAX_CARD_RENDER_NUMBER
  }),
  changeServerStatus: (status) => ({
    type: ActionType.CHANGE_SERVER_STATUS,
    payload: status,
  }),
};

export {ActionCreator, ActionType};
