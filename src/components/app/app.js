import React from "react";
import PropTypes from "prop-types";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main";
import MovieDetails from "../movie-details/movie-details";
import ErrorMessage from "../error-message/error-message";

import {ActionCreator} from "../../reducer/app/action-creator";
import {Operation} from "../../reducer/data/reducer";
import {SERVER_NOT_WORKING_ERROR} from "../../constants";
import {getActiveCard, getServerStatus} from "../../reducer/app/selectors";
import {getFilms, getFilmsComments} from "../../reducer/data/selectors";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.filmNameClickHandler = this.filmNameClickHandler.bind(this);
  }

  filmNameClickHandler(filmName) {
    const {films, cardClickHandler} = this.props;

    cardClickHandler(films.findIndex((film) => film.id === filmName));
  }

  _renderApp() {
    const {films, filmsComments, activeCard, isServerAvailable} = this.props;

    if (isServerAvailable !== true) {
      return <ErrorMessage errorMessage={SERVER_NOT_WORKING_ERROR} />;
    }

    if (activeCard === -1) {
      return <Main {...this.props} filmNameClickHandler={this.filmNameClickHandler} />;
    } else {
      return <MovieDetails
        films={films}
        film={films[activeCard]}
        filmComment={filmsComments}
        filmNameClickHandler={this.filmNameClickHandler}/>;
    }
  }

  render() {
    const {films, filmsComments, activeCard} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-component">
            <MovieDetails
              films={films}
              film={films[activeCard]}
              filmComment={filmsComments}
              filmNameClickHandler={this.filmNameClickHandler}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCard: getActiveCard(state),
  films: getFilms(state),
  filmsComments: getFilmsComments(state),
  isServerAvailable: getServerStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  cardClickHandler(id) {
    dispatch(ActionCreator.changeActiveCard(id));
    dispatch(Operation.getCommentsList(id));
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
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
