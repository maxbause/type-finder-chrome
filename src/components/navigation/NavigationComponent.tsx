import * as React from "react";
import "./navigation.scss";

export default class NavigationComponent extends React.Component {
  public render() {
    return (
      <div className="navigation">
        <img className="navigation__logo" src="assets/images/ts-logo.jpg" alt="TypeScript Logo"/>
        <div className="navigation__text">TypeFinder</div>
      </div>
    );
  }
}