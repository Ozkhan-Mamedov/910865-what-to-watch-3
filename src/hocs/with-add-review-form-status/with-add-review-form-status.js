import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import history from "../../history";
import {MAX_POST_LENGTH, MIN_POST_LENGTH} from "../../constants";
import {getActiveCard} from "../../reducer/app/selectors";
import {getFilms, getFormPendingStatus} from "../../reducer/data/selectors";
import {ActionCreator as DataActionCreator} from "../../reducer/data/action-creator";
import {Operation as DataOperation} from "../../reducer/data/reducer";
import {ActionCreator as AppActionCreator} from "../../reducer/app/action-creator";

const withAddReviewFormStatus = (Component) => {
  class WithAddReviewFormStatus extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 3,
        comment: ``,
      };

      this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
      this.handleRadioButtonClick = this.handleRadioButtonClick.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleReviewPostError = this.handleReviewPostError.bind(this);
      this.formRef = React.createRef();
      this.firstRadioButtonRef = React.createRef();
      this.secondRadioButtonRef = React.createRef();
      this.thirdRadioButtonRef = React.createRef();
      this.fourthRadioButtonRef = React.createRef();
      this.fifthRadioButtonRef = React.createRef();
      this.textAreaRef = React.createRef();
      this.submitButton = React.createRef();
    }

    handleRadioButtonClick(value) {
      this.setState({
        rating: value,
      });
    }

    handleTextAreaChange(evt) {
      this.setState({
        comment: evt.currentTarget.value,
      });
    }

    handleReviewPostError() {
      const {formPending} = this.props;

      if (!formPending) {
        this.formRef.current.classList.add(`shake`);
        setTimeout(() => {
          this.formRef.current.classList.remove(`shake`);
        }, 1000);
      }
    }

    handleFormSubmit(evt) {
      const {comment} = this.state;
      const {postReview, activeCard, updateCommentsList, changeFormPendingStatus} = this.props;

      evt.preventDefault();
      if ((comment.length >= MIN_POST_LENGTH) && (comment.length <= MAX_POST_LENGTH)) {
        changeFormPendingStatus(true);

        postReview(this.state, activeCard, () => {
          changeFormPendingStatus(false);
          history.goBack();
        });
        updateCommentsList(activeCard + 1);
      }
    }

    render() {
      const {rating, comment} = this.state;

      return <Component {...this.props}
        rating={rating}
        comment={comment}
        onErrorOccured={this.handleReviewPostError}
        onTextAreaChange={this.handleTextAreaChange}
        onRadioButtonClick={this.handleRadioButtonClick}
        firstRadioButtonRef={this.firstRadioButtonRef}
        secondRadioButtonRef={this.secondRadioButtonRef}
        thirdRadioButtonRef={this.thirdRadioButtonRef}
        fourthRadioButtonRef={this.fourthRadioButtonRef}
        fifthRadioButtonRef={this.fifthRadioButtonRef}
        textAreaRef={this.textAreaRef}
        submitButton={this.submitButton}
        onFormSubmit={this.handleFormSubmit}
        formRef={this.formRef}
      />;
    }

    componentDidMount() {
      const {changeActiveCard, id} = this.props;

      changeActiveCard(id);
    }
  }

  const mapStateToProps = (state) => ({
    activeCard: getActiveCard(state),
    films: getFilms(state),
    formPending: getFormPendingStatus(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    postReview(data, id, handleSuccessfulRequest) {
      dispatch(DataOperation.postReview(data, id, handleSuccessfulRequest));
    },
    updateCommentsList(id) {
      dispatch(DataOperation.getCommentsList(id));
    },
    changeActiveCard(id) {
      dispatch(AppActionCreator.changeActiveCard(id));
    },
    changeFormPendingStatus(status) {
      dispatch(DataActionCreator.changeFormPendingStatus(status));
    }
  });

  WithAddReviewFormStatus.propTypes = {
    changeActiveCard: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    postReview: PropTypes.func.isRequired,
    activeCard: PropTypes.number.isRequired,
    updateCommentsList: PropTypes.func.isRequired,
    changeFormPendingStatus: PropTypes.func.isRequired,
    formPending: PropTypes.bool.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithAddReviewFormStatus);
};

export {withAddReviewFormStatus};
export default withAddReviewFormStatus;
