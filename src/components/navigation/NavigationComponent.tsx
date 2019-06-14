import * as React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import "./navigation.scss";

class NavigationComponent extends React.Component<RouteComponentProps> {
  public render() {
    const navigationLinkClasses = ["navigation__close-link"];
    if (this.props.history.location.pathname === "/") {
      navigationLinkClasses.push("navigation__close-link--hide");
    }

    return (
      <div className="navigation">
        <img className="navigation__logo" src="assets/images/ts-logo.jpg" alt="TypeScript Logo"/>
        <div className="navigation__text">TypeFinder</div>
        <Link to="/" className={navigationLinkClasses.join(" ")}>
          <img className="navigation__close" src="assets/icons/close-white.svg" alt="Close" />
        </Link>
      </div>
    );
  }
}

export default withRouter(NavigationComponent);