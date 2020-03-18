import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {DAY_SUBSTR, MINUTES_IN_HOUR, MONTH_KEYS, MONTH_SUBSTR, TABS_KEYS, YEAR_SUBSTR} from "../constants";
import {getAuthorizationStatus} from "../reducer/user/selectors";
import {Operation} from "../reducer/data/reducer";

const withActiveTab = (Component) => {
  class WithActiveTab extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: TABS_KEYS.OVERVIEW,
      };

      this.tabClickHandler = this.tabClickHandler.bind(this);
      this.getMoreLikeThisFilm = this.getMoreLikeThisFilm.bind(this);
      this.getDateTime = this.getDateTime.bind(this);
      this.getFullDate = this.getFullDate.bind(this);
      this.getTextRating = this.getTextRating.bind(this);
      this.formatRating = this.formatRating.bind(this);
      this.getFilmDuration = this.getFilmDuration.bind(this);
      this.getStarringList = this.getStarringList.bind(this);
    }

    getMoreLikeThisFilm() {
      const {film: targetFilm, films} = this.props;
      const {genre} = targetFilm;

      return films.filter((film) => film.genre === genre && targetFilm !== film);
    }

    getDateTime(date) {
      const mseconds = Date.parse(date);

      return new Date(mseconds).toLocaleDateString().replace(/\./g, `-`);
    }

    getFullDate(date) {
      const mseconds = Date.parse(date);
      const dateString = new Date(mseconds).toDateString();
      const year = dateString.substr(YEAR_SUBSTR.START, YEAR_SUBSTR.LENGTH);
      const currentMonthKey = dateString.substr(MONTH_SUBSTR.START, MONTH_SUBSTR.LENGTH);
      const month = MONTH_KEYS.find((monthKey) => monthKey.key === currentMonthKey).month;
      const day = dateString.substr(DAY_SUBSTR.START, DAY_SUBSTR.LENGTH);

      return `${month} ${day[0] === `0` ? day[day.length - 1] : day}, ${year}`;
    }

    getTextRating(num) {
      if (num < 3) {
        return `Bad`;
      }
      if ((num >= 3) && (num < 5)) {
        return `Normal`;
      }
      if ((num >= 5) && (num < 8)) {
        return `Good`;
      }
      if ((num >= 8) && (num < 10)) {
        return `Very good`;
      }
      if (num === 10) {
        return `Awesome`;
      }

      return null;
    }

    formatRating(num) {
      const stringNumber = num.toString();

      return stringNumber.replace(`.`, `,`);
    }

    getFilmDuration(duration) {
      const hours = Math.floor(duration / MINUTES_IN_HOUR);
      const minutes = duration - (hours * MINUTES_IN_HOUR);

      return `${hours === 0 ? `` : hours + `h `}${minutes === 0 ? `` : minutes + `m`}`;
    }

    getStarringList(actors) {
      return actors.map((actor, index, arr) => {
        if (index < arr.length - 1) {
          return (
            <React.Fragment key={index}>
              {actor}, <br/>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={index}>
              {actor}
            </React.Fragment>
          );
        }
      });
    }

    tabClickHandler(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab,
        });
      }
    }

    render() {
      const {activeTab} = this.state;

      return <Component {...this.props}
        activeTab={activeTab}
        tabClickHandler={this.tabClickHandler}
        getMoreLikeThisFilm={this.getMoreLikeThisFilm}
        getDateTime={this.getDateTime}
        getFullDate={this.getFullDate}
        getTextRating={this.getTextRating}
        formatRating={this.formatRating}
        getFilmDuration={this.getFilmDuration}
        getStarringList={this.getStarringList}
      />;
    }

    componentDidMount() {
      const {updateCommentsList, id} = this.props;

      updateCommentsList(id);
    }
  }

  const mapStateToProps = (state) => ({
    authorizationStatus: getAuthorizationStatus(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    updateCommentsList(id) {
      dispatch(Operation.getCommentsList(id));
    }
  });

  WithActiveTab.propTypes = {
    updateCommentsList: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    film: PropTypes.exact({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      releaseDate: PropTypes.string.isRequired,
      ratingScore: PropTypes.number.isRequired,
      ratingsNumber: PropTypes.number.isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string,
      preview: PropTypes.string.isRequired,
      runTime: PropTypes.number.isRequired,
      previewImage: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
    }),
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
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithActiveTab);
};

export default withActiveTab;
