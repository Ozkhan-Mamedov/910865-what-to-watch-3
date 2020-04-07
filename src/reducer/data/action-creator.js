import {
  GET_COMMENTS_LIST, GET_FILM_LIST, GET_PROMO_MOVIE_DATA,
  GET_FAVORITE_FILMS, CHANGE_FORM_PENDING_STATUS
} from "../../constants";

const ActionType = {
  GET_FILM_LIST,
  GET_COMMENTS_LIST,
  GET_PROMO_MOVIE_DATA,
  GET_FAVORITE_FILMS,
  CHANGE_FORM_PENDING_STATUS
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
  }),
  changeFormPendingStatus: (status) => ({
    type: ActionType.CHANGE_FORM_PENDING_STATUS,
    payload: status,
  })
};

export {ActionCreator, ActionType};
