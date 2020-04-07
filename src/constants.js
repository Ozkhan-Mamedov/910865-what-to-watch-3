const ALL_GENRES = `ALL_GENRES`;
const GenreKey = {
  ALL_GENRES,
  COMEDY: `Comedy`,
  DRAMA: `Drama`,
  THRILLER: `Thriller`,
  CRIME: `Crime`,
  ADVENTURE: `Adventure`,
  ACTION: `Action`,
  FANTASY: `Fantasy`
};
const Genre = {
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
const INCREASE_CARDS_NUMBER = `INCREASE_CARDS_NUMBER`;
const DECREASE_CARDS_NUMBER = `DECREASE_CARDS_NUMBER`;
const GET_FILM_LIST = `GET_FILM_LIST`;
const GET_PROMO_MOVIE_DATA = `GET_PROMO_MOVIE_DATA`;
const GET_COMMENTS_LIST = `GET_COMMENTS_LIST`;
const CHANGE_SERVER_STATUS = `CHANGE_SERVER_STATUS`;
const CHANGE_AUTHORIZATION_STATUS = `CHANGE_AUTHORIZATION_STATUS`;
const GET_FAVORITE_FILMS = `GET_FAVORITE_FILMS`;
const CHANGE_FORM_PENDING_STATUS = `CHANGE_FORM_PENDING_STATUS`;

const TABS_LIST = [`Overview`, `Details`, `Reviews`];
const TabKey = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MonthSubstr = {
  START: 4,
  LENGTH: 3
};
const DaySubstr = {
  START: 8,
  LENGTH: 2
};
const YearSubstr = {
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

const PreviewPlayerProperty = {
  WIDTH: 280,
  HEIGHT: 175,
};

const Error = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: `5xx`,
};
const SERVER_NOT_WORKING_ERROR = `Oops server error occurred!`;
const FILM_NOT_FOUND_ERROR = `Film not found!`;
const AUTH_ERROR_MESSAGE = `Please enter a valid email address`;

const HeaderType = {
  MOVIE_CARD: `movie-card__head`,
  USER_PAGE: `user-page__head`,
};

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const MAX_POST_LENGTH = `400`;
const MIN_POST_LENGTH = `50`;

const AppRoute = {
  LOGIN: `/login`,
  ROOT: `/`,
  MY_LIST: `/mylist`,
  PLAYER: `/player`,
  FILM: `/films`,
};

export {
  ALL_GENRES,
  CHANGE_FILTER_BY_GENRE,
  Genre,
  GenreKey,
  MAX_GENRE_NUMBER,
  TABS_LIST,
  TabKey,
  MINUTES_IN_HOUR,
  CHANGE_ACTIVE_CARD,
  MonthSubstr,
  DaySubstr,
  YearSubstr,
  MONTH_KEYS,
  MORE_LIKE_THIS_LIST,
  MOVIE_LIST,
  MORE_LIKE_THIS_FILMS,
  MAX_CARD_RENDER_NUMBER,
  INCREASE_CARDS_NUMBER,
  PreviewPlayerProperty,
  DECREASE_CARDS_NUMBER,
  SECONDS_IN_MINUTE,
  GET_FILM_LIST,
  GET_COMMENTS_LIST,
  GET_PROMO_MOVIE_DATA,
  Error,
  CHANGE_SERVER_STATUS,
  SERVER_NOT_WORKING_ERROR,
  HeaderType,
  CHANGE_AUTHORIZATION_STATUS,
  AuthorizationStatus,
  MAX_POST_LENGTH,
  MIN_POST_LENGTH,
  AppRoute,
  GET_FAVORITE_FILMS,
  FILM_NOT_FOUND_ERROR,
  AUTH_ERROR_MESSAGE,
  CHANGE_FORM_PENDING_STATUS
};
