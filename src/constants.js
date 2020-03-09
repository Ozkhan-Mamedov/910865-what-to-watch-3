const ALL_GENRES = `ALL_GENRES`;
const GENRE_KEYS = {
  ALL_GENRES,
  COMEDY: `Comedy`,
  DRAMA: `Drama`,
  THRILLER: `Thriller`,
  CRIME: `Crime`,
  ADVENTURE: `Adventure`,
  ACTION: `Action`,
  FANTASY: `Fantasy`
};
const GENRES = {
  ALL_GENRES: `All genres`,
  COMEDY: `Comedies`,
  DRAMA: `Dramas`,
  THRILLER: `Thrillers`,
  CRIME: `Crime`,
  ADVENTURE: `Adventures`,
  ACTION: `Action`,
  FANTASY: `Fantasies`
};
const MAX_GENRE_NUMBER = 10;

const CHANGE_FILTER_BY_GENRE = `CHANGE_FILTER_BY_GENRE`;
const CHANGE_ACTIVE_CARD = `CHANGE_ACTIVE_CARD`;
const INCREMENT_CARDS_NUMBER = `INCREMENT_CARDS_NUMBER`;
const DECREASE_CARDS_NUMBER = `DECREASE_CARDS_NUMBER`;
const RENDER_PLAYER = `RENDER_PLAYER`;
const UNRENDER_PLAYER = `UNRENDER_PLAYER`;
const GET_FILM_LIST = `GET_FILM_LIST`;
const GET_PROMO_MOVIE_DATA = `GET_PROMO_MOVIE_DATA`;
const GET_COMMENTS_LIST = `GET_COMMENTS_LIST`;
const CHANGE_SERVER_STATUS = `CHANGE_SERVER_STATUS`;
const CHANGE_AUTHORIZATION_STATUS = `CHANGE_AUTHORIZATION_STATUS`;

const TABS_LIST = [`Overview`, `Details`, `Reviews`];
const TABS_KEYS = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MONTH_SUBSTR = {
  START: 4,
  LENGTH: 3
};
const DAY_SUBSTR = {
  START: 8,
  LENGTH: 2
};
const YEAR_SUBSTR = {
  START: 11,
  LENGTH: 4
};
const MONTH_KEYS = [
  {
    month: `January`,
    key: `Jan`,
  },
  {
    month: `February`,
    key: `Feb`,
  },
  {
    month: `March`,
    key: `Mar`,
  },
  {
    month: `April`,
    key: `Apr`,
  },
  {
    month: `May`,
    key: `May`,
  },
  {
    month: `June`,
    key: `Jun`,
  },
  {
    month: `Jule`,
    key: `Jul`,
  },
  {
    month: `August`,
    key: `Aug`,
  },
  {
    month: `September`,
    key: `Sep`,
  },
  {
    month: `October`,
    key: `Oct`,
  },
  {
    month: `November`,
    key: `Nov`,
  },
  {
    month: `December`,
    key: `Dec`,
  },
];

const MOVIE_LIST = `MOVIE_LIST`;
const MORE_LIKE_THIS_LIST = `MORE_LIKE_THIS_LIST`;
const MORE_LIKE_THIS_FILMS = 4;
const MAX_CARD_RENDER_NUMBER = 8;

const PREVIEW_PLAYER_PROPERTIES = {
  WIDTH: 280,
  HEIGHT: 175,
};

const ERROR = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: `5xx`,
};
const SERVER_NOT_WORKING_ERROR = `Oops server error occurred!`;

const HEADER_TYPE = {
  MOVIE_CARD: `movie-card__head`,
  USER_PAGE: `user-page__head`,
};

const AUTHORIZATION_STATUS = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
  REQUIRED: `REQUIRED`,
};

export {
  ALL_GENRES,
  CHANGE_FILTER_BY_GENRE,
  GENRES,
  GENRE_KEYS,
  MAX_GENRE_NUMBER,
  TABS_LIST,
  TABS_KEYS,
  MINUTES_IN_HOUR,
  CHANGE_ACTIVE_CARD,
  MONTH_SUBSTR,
  DAY_SUBSTR,
  YEAR_SUBSTR,
  MONTH_KEYS,
  MORE_LIKE_THIS_LIST,
  MOVIE_LIST,
  MORE_LIKE_THIS_FILMS,
  MAX_CARD_RENDER_NUMBER,
  INCREMENT_CARDS_NUMBER,
  PREVIEW_PLAYER_PROPERTIES,
  DECREASE_CARDS_NUMBER,
  RENDER_PLAYER,
  UNRENDER_PLAYER,
  SECONDS_IN_MINUTE,
  GET_FILM_LIST,
  GET_COMMENTS_LIST,
  GET_PROMO_MOVIE_DATA,
  ERROR,
  CHANGE_SERVER_STATUS,
  SERVER_NOT_WORKING_ERROR,
  HEADER_TYPE,
  CHANGE_AUTHORIZATION_STATUS,
  AUTHORIZATION_STATUS,
};
