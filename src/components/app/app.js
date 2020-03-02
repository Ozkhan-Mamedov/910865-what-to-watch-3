import React from "react";
import PropTypes from "prop-types";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main";
import MovieDetails from "../movie-details/movie-details";

import {ActionCreator} from "../../reducer/reducer";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.filmNameClickHandler = this.filmNameClickHandler.bind(this);
  }

  filmNameClickHandler(filmName) {
    const {films, cardClickHandler} = this.props;

    cardClickHandler(films.findIndex((film) => film.name === filmName));
  }

  _renderApp() {
    const {films, filmsComments, activeCard} = this.props;

    if (activeCard === -1) {
      return <Main {...this.props} filmNameClickHandler={this.filmNameClickHandler} />;
    } else {
      return <MovieDetails
        films={films}
        film={films[activeCard]}
        filmComment={filmsComments.find((filmComments) => (activeCard + 1) === filmComments.filmId)}
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
              filmComment={filmsComments.find((filmComments) => (activeCard + 1) === filmComments.filmId)}
              filmNameClickHandler={this.filmNameClickHandler}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  activeCard: state.activeCard
});

const mapDispatchToProps = (dispatch) => ({
  cardClickHandler(id) {
    dispatch(ActionCreator.changeActiveCard(id));
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
    description: PropTypes.arrayOf(PropTypes.string),
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  })),
  filmsComments: PropTypes.arrayOf(PropTypes.exact({
    filmId: PropTypes.number.isRequired,
    commentsList: PropTypes.arrayOf(PropTypes.exact({
      userName: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }))
  })),
  activeCard: PropTypes.number.isRequired,
  cardClickHandler: PropTypes.func.isRequired
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
