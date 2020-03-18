import {createSelector} from "reselect";

import NameSpace from "../name-space";
import {getGenre} from "../app/selectors";
import {ALL_GENRES} from "../../constants";

const NAME_SPACE = NameSpace.DATA;

const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

const getFilteredFilmList = createSelector(getGenre, getFilms, (genre, films) => {
  return films.filter((film) => {
    if (genre === ALL_GENRES) {
      return film.genre;
    }

    return film.genre === genre;
  });
});

const getFilmsComments = (state) => {
  return state[NAME_SPACE].filmsComments;
};

const getPromoFilm = (state) => {
  return state[NAME_SPACE].promoFilm;
};

const getFavoriteFilms = (state) => {
  return state[NAME_SPACE].favoriteFilms;
};

export {getFilms, getFilteredFilmList, getFilmsComments, getPromoFilm, getFavoriteFilms};
