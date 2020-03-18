import React from "react";
import PropTypes from "prop-types";

import Header from "../header/header";
import Footer from "../footer/footer";

import {HEADER_TYPE} from "../../constants";

const SignIn = (props) => {
  const {errorMessage, formSubmitHandler, loginRef, passwordRef} = props;

  return (
    <div className="user-page">
      <Header isMainPageElement={false} type={HEADER_TYPE.USER_PAGE}>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={formSubmitHandler}>
          {errorMessage ?
            <div className="sign-in__message">
              <p>{errorMessage}</p>
            </div>
            : null
          }
          <div className="sign-in__fields">
            <div className={`sign-in__field ${errorMessage ? `sign-in__field--error` : null}`}>
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email" ref={loginRef} />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" required={true} ref={passwordRef} />
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
};

SignIn.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  formSubmitHandler: PropTypes.func.isRequired,
  loginRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  passwordRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ])
};

export default SignIn;
