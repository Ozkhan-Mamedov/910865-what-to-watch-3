import React from "react";
import PropTypes from "prop-types";
import {Route, Switch, Router, Redirect, Link} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main";
import MovieDetails from "../movie-details/movie-details";
import ErrorMessage from "../error-message/error-message";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import Header from "../header/header";
import UserBlock from "../user-block/user-block";
import MyList from "../my-list/my-list";
import PrivateRoute from "../private-route/private-route";
import FullscreenVideoPlayer from "../fullscreen-video-player/fullscreen-video-player";

import withActiveTab from "../../hocs/withActiveTab";
import withAddReviewFormStatus from "../../hocs/withAddReviewFormStatus";
import withErrorMessage from "../../hocs/withErrorMessage";
import withFullscreenVideoPlayerStatus from "../../hocs/withFullscreenVideoPlayerStatus";
import withHoveredCard from "../../hocs/withHoveredCard";

import {ActionCreator as appActionCreator} from "../../reducer/app/action-creator";
import {ActionCreator as userActionCreator} from "../../reducer/user/action-creator";
import {Operation} from "../../reducer/data/reducer";
import {APP_ROUTES, AUTHORIZATION_STATUS, FILM_NOT_FOUND_ERROR, SERVER_NOT_WORKING_ERROR} from "../../constants";
import {getServerStatus} from "../../reducer/app/selectors";
import {getFilms, getFilmsComments, getFavoriteFilms} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import history from "../../history";

const MovieDetailsWrapped = withActiveTab(MovieDetails);
const AddReviewWrapped = withAddReviewFormStatus(AddReview);
const SignInWrapped = withErrorMessage(SignIn);
const FullscreenVideoPlayerWrapped = withFullscreenVideoPlayerStatus(FullscreenVideoPlayer);
const MyListWrapped = withHoveredCard(MyList);

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.filmNameClickHandler = this.filmNameClickHandler.bind(this);
    this.loginButtonClickHandler = this.loginButtonClickHandler.bind(this);
  }

  filmNameClickHandler(filmName) {
    const {films, cardClickHandler} = this.props;
    const filmIndex = films.findIndex((film) => film.id === filmName);

    cardClickHandler(filmIndex);
    history.push(`${APP_ROUTES.FILM}/${filmIndex}`);
  }

  loginButtonClickHandler(evt) {
    const {changeAuthorizationStatus} = this.props;

    evt.preventDefault();
    changeAuthorizationStatus(AUTHORIZATION_STATUS.REQUIRED);
  }

  render() {
    const {films, filmsComments, authorizationStatus, favoriteFilms, isServerAvailable} = this.props;

    if (isServerAvailable !== true) {
      return <ErrorMessage errorMessage={SERVER_NOT_WORKING_ERROR} />;
    }

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={APP_ROUTES.ROOT}>
            <Main {...this.props} filmNameClickHandler={this.filmNameClickHandler}
              loginButtonClickHandler={this.loginButtonClickHandler}/>
          </Route>
          <Route exact path={APP_ROUTES.LOGIN}>
            {authorizationStatus === AUTHORIZATION_STATUS.NO_AUTH ? <SignInWrapped /> : <Redirect to={APP_ROUTES.ROOT}/>}
          </Route>
          <Route exact path={`${APP_ROUTES.FILM}/:id`} render={(props) => {
            const id = parseInt(props.match.params.id, 10);

            return <MovieDetailsWrapped
              id={id}
              films={films}
              film={films[id]}
              filmComment={filmsComments}
              filmNameClickHandler={this.filmNameClickHandler}
              loginButtonClickHandler={this.loginButtonClickHandler} />;
          }}>
          </Route>
          <Route exact path={`${APP_ROUTES.PLAYER}/:id`} render={(props) => {
            const id = props.match.params.id;

            return <FullscreenVideoPlayerWrapped film={films[id]} onExitButtonClickHandler={() => {
              props.history.goBack();
            }} />;
          }}>
          </Route>
          <PrivateRoute authorizationStatus={authorizationStatus} path={APP_ROUTES.MY_LIST} exact render={() => {
            return <MyListWrapped authorizationStatus={authorizationStatus} filmNameClickHandler={this.filmNameClickHandler} films={favoriteFilms} />;
          }} />
          <PrivateRoute authorizationStatus={authorizationStatus} path={`${APP_ROUTES.FILM}/:id/review`} exact render={(props) => {
            const id = parseInt(props.match.params.id, 10);
            const film = films[id];

            return film !== undefined ? (
              <AddReviewWrapped id={id} film={film} authorizationStatus={authorizationStatus}>
                <Header isMainPageElement={false}>
                  <React.Fragment>
                    <nav className="breadcrumbs">
                      <ul className="breadcrumbs__list">
                        <li className="breadcrumbs__item">
                          <Link to={`${APP_ROUTES.FILM}/${id}`} className="breadcrumbs__link">{film.name}</Link>
                        </li>
                        <li className="breadcrumbs__item">
                          <a className="breadcrumbs__link">Add review</a>
                        </li>
                      </ul>
                    </nav>

                    <UserBlock authorizationStatus={authorizationStatus} />
                  </React.Fragment>
                </Header>
              </AddReviewWrapped>
            ) : <ErrorMessage errorMessage={FILM_NOT_FOUND_ERROR}/>;
          }} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  films: getFilms(state),
  filmsComments: getFilmsComments(state),
  isServerAvailable: getServerStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
  favoriteFilms: getFavoriteFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  cardClickHandler(id) {
    dispatch(appActionCreator.changeActiveCard(id));
    dispatch(Operation.getCommentsList(id));
  },
  changeAuthorizationStatus(status) {
    dispatch(userActionCreator.changeAuthorizationStatus(status));
  },

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
  cardClickHandler: PropTypes.func.isRequired,
  isServerAvailable: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  changeAuthorizationStatus: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
