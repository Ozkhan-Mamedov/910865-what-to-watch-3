import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import ErrorMessage from "../error-message/error-message";

import {getActiveCard} from "../../reducer/app/selectors";
import {Operation} from "../../reducer/data/reducer";
import {getFilms} from "../../reducer/data/selectors";
import {FILM_NOT_FOUND_ERROR, MAX_POST_LENGTH, MIN_POST_LENGTH} from "../../constants";
import {ActionCreator as appActionCreator} from "../../reducer/app/action-creator";
import history from "../../history";

class AddReview extends React.PureComponent {
  constructor(props) {
    super(props);

    /*
    this.state = {
      rating: null,
      comment: ``,
    };*/

    // this.radioButtonClickHandler = this.radioButtonClickHandler.bind(this);
    // this.formSubmitHandler = this.formSubmitHandler.bind(this);
    // this.textAreaChangeHandler = this.textAreaChangeHandler.bind(this);
    // this.unblockForm = this.unblockForm.bind(this);
    // this.postErrorHandler = this.postErrorHandler.bind(this);
    /*
    this.formRef = React.createRef();
    this.firstRadioButtonRef = React.createRef();
    this.secondRadioButtonRef = React.createRef();
    this.thirdRadioButtonRef = React.createRef();
    this.fourthRadioButtonRef = React.createRef();
    this.fifthRadioButtonRef = React.createRef();
    this.textAreaRef = React.createRef();
    this.submitButton = React.createRef();*/
  }

  /*
  radioButtonClickHandler(value) {
    this.setState({
      rating: value,
    });
  }

  textAreaChangeHandler(evt) {
    this.setState({
      comment: evt.currentTarget.value,
    });
  }*/

  /*
  blockForm() {
    this.firstRadioButtonRef.current.disabled = true;
    this.secondRadioButtonRef.current.disabled = true;
    this.thirdRadioButtonRef.current.disabled = true;
    this.fourthRadioButtonRef.current.disabled = true;
    this.fifthRadioButtonRef.current.disabled = true;
    this.textAreaRef.current.disabled = true;
    this.submitButton.current.disabled = true;
    this.submitButton.current.textContent = `Posting...`;
  }

  unblockForm() {
    this.firstRadioButtonRef.current.disabled = false;
    this.secondRadioButtonRef.current.disabled = false;
    this.thirdRadioButtonRef.current.disabled = false;
    this.fourthRadioButtonRef.current.disabled = false;
    this.fifthRadioButtonRef.current.disabled = false;
    this.textAreaRef.current.disabled = false;
    this.submitButton.current.disabled = false;
    this.submitButton.current.textContent = `Post`;
  }

  postErrorHandler() {
    this.formRef.current.classList.add(`shake`);
    setTimeout(() => {
      this.formRef.current.classList.remove(`shake`);
    }, 1000);
    this.unblockForm();
  }

  formSubmitHandler(evt) {
    const {postReview, activeCard, updateCommentsList} = this.props;

    this.blockForm();
    evt.preventDefault();
    postReview(this.state, activeCard, () => {
      this.unblockForm();
      history.goBack();
    }, this.postErrorHandler);
    updateCommentsList(activeCard + 1);
  }*/

  render() {
    // const {rating} = this.state;
    const {film, rating, textAreaChangeHandler, radioButtonClickHandler,
      firstRadioButtonRef, secondRadioButtonRef, thirdRadioButtonRef,
      fourthRadioButtonRef, fifthRadioButtonRef, textAreaRef,
      submitButton, formSubmitHandler, formRef} = this.props;

    return film !== undefined ? (
      <section className="movie-card movie-card--full" style={{backgroundColor: film.backgroundColor}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          {this.props.children}

          <div className="movie-card__poster movie-card__poster--small">
            <img src={film.previewImage} alt={`${film.name} poster`} width="218"
              height="327"/>
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={formSubmitHandler} ref={formRef}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" checked={rating === 1}
                  onChange={() => radioButtonClickHandler(1)} ref={firstRadioButtonRef}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" checked={rating === 2}
                  onChange={() => radioButtonClickHandler(2)} ref={secondRadioButtonRef}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked={rating === 3}
                  onChange={() => radioButtonClickHandler(3)} ref={thirdRadioButtonRef}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" checked={rating === 4}
                  onChange={() => radioButtonClickHandler(4)} ref={fourthRadioButtonRef}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" checked={rating === 5}
                  onChange={() => radioButtonClickHandler(5)} ref={fifthRadioButtonRef}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text"
                placeholder="Review text" onChange={textAreaChangeHandler}
                minLength={MIN_POST_LENGTH} maxLength={MAX_POST_LENGTH} ref={textAreaRef} />
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit"
                  ref={submitButton} disabled={true}>Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    ) :
      <ErrorMessage errorMessage={FILM_NOT_FOUND_ERROR} />;
  }

  /*
  componentDidMount() {
    const {changeActiveCard, id} = this.props;

    changeActiveCard(id);
  }

  componentDidUpdate() {
    const {rating, comment} = this.state;

    this.submitButton.current.disabled = !((rating !== null) && (comment.length >= MIN_POST_LENGTH) && (comment.length <= MAX_POST_LENGTH));
  }*/
}

/*
const mapStateToProps = (state) => ({
  activeCard: getActiveCard(state),
  films: getFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  postReview(data, id, onSuccess, onError) {
    dispatch(Operation.postReview(data, id, onSuccess, onError));
  },
  updateCommentsList(id) {
    dispatch(Operation.getCommentsList(id));
  },
  changeActiveCard(id) {
    dispatch(appActionCreator.changeActiveCard(id));
  }
});*/

AddReview.propTypes = {
  postReview: PropTypes.func.isRequired,
  activeCard: PropTypes.number.isRequired,
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
    description: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
  }),
  children: PropTypes.element,
  updateCommentsList: PropTypes.func.isRequired,
  changeActiveCard: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export {AddReview};
//export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
