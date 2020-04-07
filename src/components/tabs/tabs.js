import React from "react";
import PropTypes from "prop-types";

import {TABS_LIST} from "../../constants";

const Tabs = (props) => {
  const {activeTab, onTabClick} = props;

  return (
    <ul className="movie-nav__list">
      {
        TABS_LIST.map((tab, index) =>
          <li className={`movie-nav__item ${activeTab === tab ? `movie-nav__item--active` : ``}`} key={index}
            onClick={onTabClick}>
            <a href={null} className="movie-nav__link" style={{cursor: `pointer`}}>{tab}</a>
          </li>
        )
      }
    </ul>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default Tabs;
