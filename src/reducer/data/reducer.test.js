import {reducer} from "./reducer";
import {ActionCreator} from "./action-creator";
import initialState from "./initial-state";

const films = [
  {
    name: `Film#1`,
    picture: `picture#1`,
    genre: `genre#1`,
    id: 1,
    releaseDate: `2020`,
    ratingScore: 1,
    ratingsNumber: 2,
    director: `Director#1`,
    starring: [`Actor#1`, `Actor#2`, `Actor#3`, `Actor#4`],
    description: `Test paragraph #1.`,
    preview: `preview#1`,
    runTime: 130,
    previewImage: `preview image#1`,
    videoLink: `video link#1`,
    isFavorite: false,
    backgroundColor: `background color#1`,
    backgroundImage: `background image#1`,
  },
  {
    name: `Film#2`,
    picture: `picture#2`,
    genre: `genre#2`,
    id: 2,
    releaseDate: `2021`,
    ratingScore: 2,
    ratingsNumber: 3,
    director: `Director#2`,
    starring: [`Actor#5`, `Actor#6`, `Actor#7`, `Actor#8`],
    description: `Test paragraph #2.`,
    preview: `preview#2`,
    runTime: 131,
    previewImage: `preview image#2`,
    videoLink: `video link#2`,
    isFavorite: false,
    backgroundColor: `background color#2`,
    backgroundImage: `background image#2`,
  },
  {
    name: `Film#3`,
    picture: `picture#3`,
    genre: `genre#3`,
    id: 3,
    releaseDate: `2022`,
    ratingScore: 3,
    ratingsNumber: 4,
    director: `Director#2`,
    starring: [`Actor#9`, `Actor#10`, `Actor#11`, `Actor#12`],
    description: `Test paragraph #3.`,
    preview: `preview#3`,
    runTime: 132,
    previewImage: `preview image#3`,
    videoLink: `video link#3`,
    isFavorite: false,
    backgroundColor: `background color#3`,
    backgroundImage: `background image#3`,
  },
];

const filmsComments = [
  {
    filmId: 1,
    commentsList: [
      {
        commentId: `CommentId#1`,
        userId: `UsedId#1`,
        userName: `User#1`,
        rating: 8.9,
        comment: `Comment#1`,
        date: `2020-02-27T14:05:14.896Z`
      },
      {
        commentId: `CommentId#2`,
        userId: `UsedId#2`,
        userName: `User#2`,
        rating: 8,
        comment: `Comment#2`,
        date: `2020-02-27T14:05:14.896Z`
      },
    ]
  },
  {
    filmId: 2,
    commentsList: [
      {
        commentId: `CommentId#3`,
        userId: `UsedId#3`,
        userName: `User#3`,
        rating: 6.9,
        comment: `Comment#3`,
        date: `2020-02-27T14:05:14.896Z`
      },
      {
        commentId: `CommentId#4`,
        userId: `UsedId#4`,
        userName: `User#4`,
        rating: 2,
        comment: `Comment#4`,
        date: `2020-02-27T14:05:14.896Z`
      },
    ]
  },
];

describe(`Reducer works correctly`, () => {
  it(`Reducer without parameters returns initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should change films list correctly`, () => {
    expect(reducer(initialState, ActionCreator.getFilmList(films))).toEqual({
      films,
      filmsComments: initialState.filmsComments,
      promoFilm: initialState.promoFilm,
      favoriteFilms: initialState.favoriteFilms,
      formPending: initialState.formPending
    });
  });

  it(`Reducer should change filmsComments list correctly`, () => {
    expect(reducer(initialState, ActionCreator.getCommentsList(filmsComments))).toEqual({
      films: initialState.films,
      filmsComments,
      promoFilm: initialState.promoFilm,
      favoriteFilms: initialState.favoriteFilms,
      formPending: initialState.formPending
    });
  });

  it(`Reducer should change promo film data correctly`, () => {
    expect(reducer(initialState, ActionCreator.getPromoMovieData(films[0]))).toEqual({
      films: initialState.films,
      filmsComments: initialState.filmsComments,
      promoFilm: films[0],
      formPending: initialState.formPending,
      favoriteFilms: initialState.favoriteFilms,
    });
  });

  it(`Reducer should get favorite films correctly`, () => {
    expect(reducer(initialState, ActionCreator.getFavoriteFilms(films))).toEqual({
      films: initialState.films,
      filmsComments: initialState.filmsComments,
      promoFilm: initialState.promoFilm,
      favoriteFilms: films,
      formPending: initialState.formPending
    });
  });

  it(`Reducer should change form pending status correctly`, () => {
    expect(reducer(initialState, ActionCreator.changeFormPendingStatus(true))).toEqual({
      films: initialState.films,
      filmsComments: initialState.filmsComments,
      promoFilm: initialState.promoFilm,
      favoriteFilms: initialState.favoriteFilms,
      formPending: true,
    });
  });
});
