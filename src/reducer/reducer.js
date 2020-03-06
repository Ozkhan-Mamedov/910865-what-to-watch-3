import {
  ALL_GENRES, CHANGE_FILTER_BY_GENRE,
  CHANGE_ACTIVE_CARD, MAX_CARD_RENDER_NUMBER, INCREMENT_CARDS_NUMBER,
  DECREASE_CARDS_NUMBER, RENDER_PLAYER, UNRENDER_PLAYER, GET_FILM_LIST,
  GET_COMMENTS_LIST, GET_PROMO_MOVIE_DATA
} from "../constants";
import extend from "../utils";
import {filmAdapter, commentAdapter} from "../adapter";

const initialState = {
  genre: ALL_GENRES,
  films: [],
  filmsComments: [],
  promoMovieData: [],
  promoFilm: null,
  activeCard: -1,
  cardsRenderNumber: MAX_CARD_RENDER_NUMBER,
  isPlayerActive: false,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE,
  CHANGE_ACTIVE_CARD,
  INCREMENT_CARDS_NUMBER,
  DECREASE_CARDS_NUMBER,
  RENDER_PLAYER,
  UNRENDER_PLAYER,
  GET_FILM_LIST,
  GET_COMMENTS_LIST,
  GET_PROMO_MOVIE_DATA,
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
  incrementCardsNumber: () => ({
    type: ActionType.INCREMENT_CARDS_NUMBER,
    payload: MAX_CARD_RENDER_NUMBER
  }),
  decreaseCardsNumber: () => ({
    type: ActionType.DECREASE_CARDS_NUMBER,
    payload: MAX_CARD_RENDER_NUMBER
  }),
  renderPlayer: () => ({
    type: ActionType.RENDER_PLAYER,
    payload: true
  }),
  unrenderPlayer: () => ({
    type: ActionType.RENDER_PLAYER,
    payload: false
  }),
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
  })
};

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
    return api.get(`/comments/${id}`)
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
  }
};

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
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState, Operation};
