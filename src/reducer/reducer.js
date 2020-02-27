import {ALL_GENRES, CHANGE_FILTER_BY_GENRE, GET_FILMS_BY_GENRE,
  CHANGE_ACTIVE_CARD} from "../constants";
import films from "../mocks/films";
import filmsComments from "../mocks/comments";
import extend from "../utils";

const initialState = {
  genre: ALL_GENRES,
  films,
  filmsComments,
  activeCard: -1,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE,
  GET_FILMS_BY_GENRE,
  CHANGE_ACTIVE_CARD,
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
