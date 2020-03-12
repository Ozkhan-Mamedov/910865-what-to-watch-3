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

    case ActionType.CHANGE_SERVER_STATUS:
      return extend(state, {
        isServerAvailable: action.payload,
      });

    case ActionType.ADD_FILM_TO_WATCH:
      return extend(state, {
        filmsToWatch: state.filmsToWatch.slice().concat(action.payload),
      });

    case ActionType.REMOVE_FILM_TO_WATCH:
      const filmsToWatchList = state.filmsToWatch.slice();
      const filmIndex = filmsToWatchList.findIndex((film) => film === action.payload);

      filmsToWatchList.splice(filmIndex, 1);

      return extend(state, {
        filmsToWatch: filmsToWatchList,
      });
  }

  return state;
};

export {reducer};
