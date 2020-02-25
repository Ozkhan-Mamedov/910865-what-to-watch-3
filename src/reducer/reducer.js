import {ALL_GENRES, CHANGE_FILTER_BY_GENRE, GET_FILMS_BY_GENRE} from "../constants";
import films from "../mocks/films";
import extend from "../utils";

const initialState = {
  genre: ALL_GENRES,
  films,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE,
  GET_FILMS_BY_GENRE,
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
