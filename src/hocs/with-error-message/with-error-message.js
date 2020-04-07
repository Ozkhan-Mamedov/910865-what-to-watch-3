import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {AUTH_ERROR_MESSAGE} from "../../constants";
import {Operation as UserOperation} from "../../reducer/user/reducer";

const withErrorMessage = (Component) => {
  class WithErrorMessage extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        errorMessage: ``,
      };

      this.loginRef = React.createRef();
      this.passwordRef = React.createRef();
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(evt) {
      const {sendAuthData} = this.props;

      evt.preventDefault();
      sendAuthData({
        login: this.loginRef.current.value,
        password: this.passwordRef.current.value,
      }, () => this.setState({
        errorMessage: AUTH_ERROR_MESSAGE
      }));
    }

    render() {
      const {errorMessage} = this.state;

      return <Component {...this.props}
        errorMessage={errorMessage}
        onFormSubmit={this.handleFormSubmit}
        loginRef={this.loginRef}
        passwordRef={this.passwordRef}
      />;
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    sendAuthData(data, handleErrorRequest) {
      dispatch(UserOperation.login(data, handleErrorRequest));
    }
  });

  WithErrorMessage.propTypes = {
    sendAuthData: PropTypes.func.isRequired,
  };

  return connect(null, mapDispatchToProps)(WithErrorMessage);
};

export default withErrorMessage;
