import React from "react";
import PropTypes from "prop-types";

import {TABS_LIST} from "../../constants";

const Tabs = (props) => {
  const {activeTab} = props;

  return (
    <ul className="movie-nav__list">
      {
        TABS_LIST.map((tab, index) =>
          <li className={`movie-nav__item ${activeTab === tab ? `movie-nav__item--active` : ``}`} key={index}>
            <a href="#" className="movie-nav__link">{tab}</a>
          </li>
        )
      }
    </ul>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired
};

export default Tabs;
