import React from "react";
import {TABS_KEYS} from "../constants";

const withActiveTab = (Component) => {
  class WithActiveTab extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: TABS_KEYS.OVERVIEW,
      };

      this.tabClickHandler = this.tabClickHandler.bind(this);
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

      return <Component {...this.props} activeTab={activeTab} tabClickHandler={this.tabClickHandler} />;
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
