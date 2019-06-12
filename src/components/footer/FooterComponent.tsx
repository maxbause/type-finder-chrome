import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import "./footer.scss";

class FooterComponent extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <footer className="footer">
        <ul className="footer__list">
          <li className="footer__item" key="donate"><span>💸</span></li>
          <li className="footer__item" key="repo"><span>🔌</span></li>
          <li className="footer__item" key="settings"><span onClick={this.props.history.push.bind(this, "/settings")}>️⚙️</span></li>
        </ul>
      </footer>
    );
  }
}

export default withRouter(FooterComponent);