import {
  GET_COMMENTS_LIST, GET_FILM_LIST, GET_PROMO_MOVIE_DATA
} from "../../constants";

const ActionType = {
  GET_FILM_LIST,
  GET_COMMENTS_LIST,
  GET_PROMO_MOVIE_DATA,
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
};

export {ActionCreator, ActionType};
