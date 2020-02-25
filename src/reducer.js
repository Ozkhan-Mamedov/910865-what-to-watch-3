import {ALL_GENRES, CHANGE_FILTER_BY_GENRE, GET_FILMS_BY_GENRE} from "./constants";
import films from "./mocks/films";
import extend from "./utils";

const initialState = {
  genre: ALL_GENRES,
  films,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE,
  GET_FILMS_BY_GENRE,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_BY_GENRE:
      return extend(state, {
        genre: action.payload,
      });

    case GET_FILMS_BY_GENRE:
      return extend(state, {
        films: films.filter((it) => it.genre === state.genre),
      });
  }

  return state;
};

export {reducer, ActionType};
