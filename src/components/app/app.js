import React from "react";
import PropTypes from "prop-types";
import {Route, Switch, Router, Redirect, Link} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";
import ErrorPage from "../error-page/error-page";
import SignInPage from "../sign-in-page/sign-in-page";
import AddReviewPage from "../add-review-page/add-review-page";
import Header from "../header/header";
import UserBlock from "../user-block/user-block";
import MyListPage from "../my-list-page/my-list-page";
import PrivateRoute from "../private-route/private-route";
import FullscreenVideoPlayerPage from "../fullscreen-video-player-page/fullscreen-video-player-page";

import withActiveTab from "../../hocs/with-active-tab/with-active-tab";
import withAddReviewFormStatus from "../../hocs/with-add-review-form-status/with-add-review-form-status";
import withErrorMessage from "../../hocs/with-error-message/with-error-message";
import withFullscreenVideoPlayerStatus from "../../hocs/with-fullscreen-video-player-status/with-fullscreen-video-player-status";
import withHoveredCard from "../../hocs/with-hovered-card/with-hovered-card";

import {AppRoute, AuthorizationStatus, FILM_NOT_FOUND_ERROR} from "../../constants";
import {getServerStatus} from "../../reducer/app/selectors";
import {getFilms, getFilmsComments, getFavoriteFilms} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import history from "../../history";

const MoviePageWrapped = withActiveTab(MoviePage);
const AddReviewPageWrapped = withAddReviewFormStatus(AddReviewPage);
const SignInPageWrapped = withErrorMessage(SignInPage);
const FullscreenVideoPlayerPageWrapped = withFullscreenVideoPlayerStatus(FullscreenVideoPlayerPage);
const MyListPageWrapped = withHoveredCard(MyListPage);

const App = (props) => {
  const {films, filmsComments, authorizationStatus, favoriteFilms} = props;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage/>
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          {authorizationStatus === AuthorizationStatus.NO_AUTH ? <SignInPageWrapped /> : <Redirect to={AppRoute.ROOT}/>}
        </Route>
        <Route exact path={`${AppRoute.FILM}/:id`} render={(renderProps) => {
          const id = parseInt(renderProps.match.params.id, 10);

          return films[id] !== undefined ?
            <MoviePageWrapped
              id={id}
              films={films}
              film={films[id]}
              filmsComments={filmsComments}
            />
            : <ErrorPage errorMessage={FILM_NOT_FOUND_ERROR}/>;
        }}>
        </Route>
        <Route exact path={`${AppRoute.PLAYER}/:id`} render={(renderProps) => {
          const id = renderProps.match.params.id;

          return films[id] !== undefined ?
            <FullscreenVideoPlayerPageWrapped film={films[id]} />
            : <ErrorPage errorMessage={FILM_NOT_FOUND_ERROR}/>;
        }}>
        </Route>
        <PrivateRoute authorizationStatus={authorizationStatus} path={AppRoute.MY_LIST} exact render={() => {
          return <MyListPageWrapped
            authorizationStatus={authorizationStatus}
            films={favoriteFilms}
          />;
        }} />
        <PrivateRoute authorizationStatus={authorizationStatus} path={`${AppRoute.FILM}/:id/review`} exact
          render={(renderProps) => {
            const id = parseInt(renderProps.match.params.id, 10);
            const film = films[id];

            return film !== undefined ? (
              <AddReviewPageWrapped id={id} film={film} authorizationStatus={authorizationStatus}>
                <Header isMainPageElement={false}>
                  <nav className="breadcrumbs">
                    <ul className="breadcrumbs__list">
                      <li className="breadcrumbs__item">
                        <Link to={`${AppRoute.FILM}/${id}`} className="breadcrumbs__link">{film.name}</Link>
                      </li>
                      <li className="breadcrumbs__item">
                        <a className="breadcrumbs__link">Add review</a>
                      </li>
                    </ul>
                  </nav>
                  <UserBlock authorizationStatus={authorizationStatus} />
                </Header>
              </AddReviewPageWrapped>
            ) : <ErrorPage errorMessage={FILM_NOT_FOUND_ERROR}/>;
          }} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  filmsComments: getFilmsComments(state),
  isServerAvailable: getServerStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
  favoriteFilms: getFavoriteFilms(state),
});

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    releaseDate: PropTypes.string.isRequired,
    ratingScore: PropTypes.number.isRequired,
    ratingsNumber: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
  })),
  filmsComments: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })),
  isServerAvailable: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  favoriteFilms: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    releaseDate: PropTypes.string.isRequired,
    ratingScore: PropTypes.number.isRequired,
    ratingsNumber: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
  })),
};

export {App};
export default connect(mapStateToProps)(App);
