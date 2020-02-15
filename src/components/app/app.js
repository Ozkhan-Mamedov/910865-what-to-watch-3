import React from "react";
import PropTypes from "prop-types";
import {Route, Switch, BrowserRouter} from "react-router-dom";

import Main from "../main/main";
import MovieDetails from "../movie-details/movie-details";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: -1
    };

    this.filmNameClickHandler = this.filmNameClickHandler.bind(this);
  }

  filmNameClickHandler(filmName) {
    const {films} = this.props;

    this.setState({
      activeCard: films.findIndex((film) => film.name === filmName),
    });
  }

  render() {
    const {films} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {
              this.state.activeCard === -1
                ? <Main {...this.props} filmNameClickHandler={this.filmNameClickHandler} />
                : <MovieDetails film={films[this.state.activeCard]} />
            }
          </Route>
          <Route exact path="/dev-component">
            <MovieDetails film={films[this.state.activeCard]} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

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
  })),
};

export default App;
