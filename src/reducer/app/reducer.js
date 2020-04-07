import extend from "../../utils";
import initialState from "./initial-state";
import {ActionType} from "./action-creator";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_FILTER_BY_GENRE:
      return extend(state, {
        genre: action.payload,
      });

    case ActionType.CHANGE_ACTIVE_CARD:
      return extend(state, {
        activeCard: action.payload,
      });

    case ActionType.INCREASE_CARDS_NUMBER:
      return extend(state, {
        cardsRenderNumber: state.cardsRenderNumber + action.payload,
      });

    case ActionType.DECREASE_CARDS_NUMBER:
      return extend(state, {
        cardsRenderNumber: action.payload,
      });

    case ActionType.CHANGE_SERVER_STATUS:
      return extend(state, {
        isServerAvailable: action.payload,
      });
  }

  return state;
};

export {reducer};
