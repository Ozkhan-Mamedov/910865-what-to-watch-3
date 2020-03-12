import React from "react";
import PropTypes from "prop-types";
import {Route, Switch, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main";
import MovieDetails from "../movie-details/movie-details";
import ErrorMessage from "../error-message/error-message";
import SignIn from "../sign-in/sign-in";
/*
import AddReview from "../add-review/add-review";
import Header from "../header/header";
import UserBlock from "../user-block/user-block";
 */

import {ActionCreator as appActionCreator} from "../../reducer/app/action-creator";
import {ActionCreator as userActionCreator} from "../../reducer/user/action-creator";
import {Operation} from "../../reducer/data/reducer";
import {APP_ROUTES, AUTHORIZATION_STATUS, SERVER_NOT_WORKING_ERROR} from "../../constants";
import {getActiveCard, getServerStatus} from "../../reducer/app/selectors";
import {getFilms, getFilmsComments} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import history from "../../history";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.filmNameClickHandler = this.filmNameClickHandler.bind(this);
    this.loginButtonClickHandler = this.loginButtonClickHandler.bind(this);
  }

  filmNameClickHandler(filmName) {
    const {films, cardClickHandler} = this.props;

    cardClickHandler(films.findIndex((film) => film.id === filmName));
  }

  loginButtonClickHandler(evt) {
    const {changeAuthorizationStatus} = this.props;

    evt.preventDefault();
    changeAuthorizationStatus(AUTHORIZATION_STATUS.REQUIRED);
  }

  _renderApp() {
    const {films, filmsComments, activeCard, isServerAvailable, authorizationStatus} = this.props;

    if (isServerAvailable !== true) {
      return <ErrorMessage errorMessage={SERVER_NOT_WORKING_ERROR} />;
    }

    if (authorizationStatus === AUTHORIZATION_STATUS.REQUIRED) {
      return <SignIn />;
    }

    if (activeCard === -1) {
      return <Main {...this.props} filmNameClickHandler={this.filmNameClickHandler}
        loginButtonClickHandler={this.loginButtonClickHandler}/>;
    } else {
      return <MovieDetails
        films={films}
        film={films[activeCard]}
        filmComment={filmsComments}
        filmNameClickHandler={this.filmNameClickHandler}
        loginButtonClickHandler={this.loginButtonClickHandler} />;
    }
  }

  render() {
    // const {films, filmsComments, activeCard, authorizationStatus} = this.props;
    const {authorizationStatus} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={APP_ROUTES.ROOT}>
            <Main {...this.props} filmNameClickHandler={this.filmNameClickHandler}
              loginButtonClickHandler={this.loginButtonClickHandler}/>
          </Route>
          <Route exact path={APP_ROUTES.LOGIN}>
            {authorizationStatus === AUTHORIZATION_STATUS.NO_AUTH ? <SignIn /> : <Redirect to={APP_ROUTES.ROOT}/>}
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCard: getActiveCard(state),
  films: getFilms(state),
  filmsComments: getFilmsComments(state),
  isServerAvailable: getServerStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  cardClickHandler(id) {
    dispatch(appActionCreator.changeActiveCard(id));
    dispatch(Operation.getCommentsList(id));
  },
  changeAuthorizationStatus(status) {
    dispatch(userActionCreator.changeAuthorizationStatus(status));
  }
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
  activeCard: PropTypes.number.isRequired,
  cardClickHandler: PropTypes.func.isRequired,
  isServerAvailable: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  changeAuthorizationStatus: PropTypes.func.isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
