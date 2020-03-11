import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Header from "../header/header";
import Footer from "../footer/footer";

import {HEADER_TYPE} from "../../constants";
import {Operation} from "../../reducer/user/reducer";

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  formSubmitHandler(evt) {
    const {sendAuthData} = this.props;

    evt.preventDefault();
    sendAuthData({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    return (
      <div className="user-page">
        <Header isMainPageElement={false} type={HEADER_TYPE.USER_PAGE}>
          <h1 className="page-title user-page__title">Sign in</h1>
        </Header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this.formSubmitHandler}>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                  id="user-email" ref={this.loginRef} />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                  id="user-password" required={true} ref={this.passwordRef} />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer isMainPageElement={false}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendAuthData(data) {
    dispatch(Operation.login(data));
  }
});

SignIn.propTypes = {
  sendAuthData: PropTypes.func.isRequired,
};

export {SignIn};
export default connect(null, mapDispatchToProps)(SignIn);
