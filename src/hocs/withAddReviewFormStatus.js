import React from "react";
import {connect} from "react-redux";

import history from "../history";
import {MAX_POST_LENGTH, MIN_POST_LENGTH} from "../constants";
import {getActiveCard} from "../reducer/app/selectors";
import {getFilms} from "../reducer/data/selectors";
import {Operation} from "../reducer/data/reducer";
import {ActionCreator as appActionCreator} from "../reducer/app/action-creator";

const withAddReviewFormStatus = (Component) => {
  class WithAddReviewFormStatus extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: null,
        comment: ``,
      };

      this.textAreaChangeHandler = this.textAreaChangeHandler.bind(this);
      this.radioButtonClickHandler = this.radioButtonClickHandler.bind(this);
      this.formSubmitHandler = this.formSubmitHandler.bind(this);
      this.unblockForm = this.unblockForm.bind(this);
      this.postErrorHandler = this.postErrorHandler.bind(this);
      this.formRef = React.createRef();
      this.firstRadioButtonRef = React.createRef();
      this.secondRadioButtonRef = React.createRef();
      this.thirdRadioButtonRef = React.createRef();
      this.fourthRadioButtonRef = React.createRef();
      this.fifthRadioButtonRef = React.createRef();
      this.textAreaRef = React.createRef();
      this.submitButton = React.createRef();
    }

    radioButtonClickHandler(value) {
      this.setState({
        rating: value,
      });
    }

    textAreaChangeHandler(evt) {
      this.setState({
        comment: evt.currentTarget.value,
      });
    }

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
    }

    render() {
      const {rating, comment} = this.state;

      return <Component {...this.props}
        rating={rating}
        comment={comment}
        textAreaChangeHandler={this.textAreaChangeHandler}
        radioButtonClickHandler={this.radioButtonClickHandler}
        firstRadioButtonRef={this.firstRadioButtonRef}
        secondRadioButtonRef={this.secondRadioButtonRef}
        thirdRadioButtonRef={this.thirdRadioButtonRef}
        fourthRadioButtonRef={this.fourthRadioButtonRef}
        fifthRadioButtonRef={this.fifthRadioButtonRef}
        textAreaRef={this.textAreaRef}
        submitButton={this.submitButton}
        formSubmitHandler={this.formSubmitHandler}
        formRef={this.formRef}
      />;
    }

    componentDidMount() {
      const {changeActiveCard, id} = this.props;

      changeActiveCard(id);
    }

    componentDidUpdate() {
      const {rating, comment} = this.state;

      this.submitButton.current.disabled = !((rating !== null) && (comment.length >= MIN_POST_LENGTH) && (comment.length <= MAX_POST_LENGTH));
    }
  }

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
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAddReviewFormStatus);
};

export default withAddReviewFormStatus;
