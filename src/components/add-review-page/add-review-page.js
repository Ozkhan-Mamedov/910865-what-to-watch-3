import React from "react";
import PropTypes from "prop-types";

import {MAX_POST_LENGTH, MIN_POST_LENGTH} from "../../constants";

const AddReviewPage = (props) => {
  const {film, comment, rating, onTextAreaChange, onRadioButtonClick,
    firstRadioButtonRef, secondRadioButtonRef, thirdRadioButtonRef,
    fourthRadioButtonRef, fifthRadioButtonRef, textAreaRef,
    submitButton, onFormSubmit, formRef, formPending, onErrorOccured} = props;

  return (
    <section className="movie-card movie-card--full" style={{backgroundColor: film.backgroundColor}}>
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={film.backgroundImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        {props.children}

        <div className="movie-card__poster movie-card__poster--small">
          <img src={film.previewImage} alt={`${film.name} poster`} width="218"
            height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={onFormSubmit} ref={formRef}>
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" checked={rating === 1}
                onChange={() => onRadioButtonClick(1)} ref={firstRadioButtonRef}
                disabled={formPending !== false}/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" checked={rating === 2}
                onChange={() => onRadioButtonClick(2)} ref={secondRadioButtonRef}
                disabled={formPending !== false}/>
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked={rating === 3}
                onChange={() => onRadioButtonClick(3)} ref={thirdRadioButtonRef}
                disabled={formPending !== false}/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" checked={rating === 4}
                onChange={() => onRadioButtonClick(4)} ref={fourthRadioButtonRef}
                disabled={formPending !== false}/>
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" checked={rating === 5}
                onChange={() => onRadioButtonClick(5)} ref={fifthRadioButtonRef}
                disabled={formPending !== false}/>
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text"
              placeholder="Review text" onChange={onTextAreaChange}
              minLength={MIN_POST_LENGTH} maxLength={MAX_POST_LENGTH} ref={textAreaRef} disabled={formPending !== false} />
            <div className="add-review__submit">
              <button className="add-review__btn"
                type="submit"
                ref={submitButton}
                onClick={(comment.length >= MIN_POST_LENGTH) && (comment.length <= MAX_POST_LENGTH) ? onFormSubmit : onErrorOccured}
              >{formPending !== false ? `Posting...` : `Post`}</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

AddReviewPage.propTypes = {
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
  rating: PropTypes.number,
  onTextAreaChange: PropTypes.func.isRequired,
  onRadioButtonClick: PropTypes.func.isRequired,
  firstRadioButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  secondRadioButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  thirdRadioButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  fourthRadioButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  fifthRadioButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  textAreaRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  submitButton: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  onFormSubmit: PropTypes.func.isRequired,
  formRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  formPending: PropTypes.bool.isRequired,
  onErrorOccured: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
};

export default AddReviewPage;
