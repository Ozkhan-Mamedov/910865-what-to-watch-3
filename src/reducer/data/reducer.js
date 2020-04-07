import {commentAdapter, filmAdapter} from "../../adapter";
import extend from "../../utils";
import initialState from "./initial-state";
import {ActionType, ActionCreator} from "./action-creator";

const Operation = {
  getFilmList: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((responce) => {
        dispatch(ActionCreator.getFilmList(
            responce.data.map((film) => filmAdapter(film))
        ));
      });
  },
  getCommentsList: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id + 1}`)
      .then((responce) => {
        dispatch(ActionCreator.getCommentsList(
            responce.data.map((comment) => commentAdapter(comment))
        ));
      });
  },
  getPromoMovieData: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((responce) => {
        dispatch(ActionCreator.getPromoMovieData(filmAdapter(responce.data)));
      });
  },
  postReview: (data, id, handleSuccessfulRequest) => (dispatch, getState, api) => {
    return api.post(`/comments/${id + 1}`, {
      rating: data.rating,
      comment: data.comment,
    })
      .then(() => {
        handleSuccessfulRequest();
      });
  },
  getFavoriteFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((responce) => {
        dispatch(ActionCreator.getFavoriteFilms(
            responce.data.map((film) => filmAdapter(film))
        ));
      });
  },
  changeFavoriteFilmStatus: (id, status, resolver) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`, extend({}, {
      isFavourite: status === 1
    })).then(() => resolver());
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_FILM_LIST:
      return extend(state, {
        films: action.payload,
      });

    case ActionType.GET_COMMENTS_LIST:
      return extend(state, {
        filmsComments: action.payload,
      });

    case ActionType.GET_PROMO_MOVIE_DATA:
      return extend(state, {
        promoFilm: action.payload,
      });

    case ActionType.GET_FAVORITE_FILMS:
      return extend(state, {
        favoriteFilms: action.payload,
      });

    case ActionType.CHANGE_FORM_PENDING_STATUS:
      return extend(state, {
        formPending: action.payload,
      });
  }

  return state;
};

export {reducer, Operation};
