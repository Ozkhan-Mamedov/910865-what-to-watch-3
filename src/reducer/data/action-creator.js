import {
  GET_COMMENTS_LIST, GET_FILM_LIST, GET_PROMO_MOVIE_DATA, GET_FAVORITE_FILMS
} from "../../constants";

const ActionType = {
  GET_FILM_LIST,
  GET_COMMENTS_LIST,
  GET_PROMO_MOVIE_DATA,
  GET_FAVORITE_FILMS,
};

const ActionCreator = {
  getFilmList: (films) => ({
    type: ActionType.GET_FILM_LIST,
    payload: films,
  }),
  getCommentsList: (commentId) => {
    return {
      type: ActionType.GET_COMMENTS_LIST,
      payload: commentId,
    };
  },
  getPromoMovieData: (data) => ({
    type: ActionType.GET_PROMO_MOVIE_DATA,
    payload: data,
  }),
  getFavoriteFilms: (films) => ({
    type: ActionType.GET_FAVORITE_FILMS,
    payload: films,
  })
};

export {ActionCreator, ActionType};
