import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import "./settings-view.scss";

class SettingsView extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div className="settings-view">
        <div className="settings-view__text">I am using:</div>
        <div className="settings-view__logo-wrapper">
          <img className="settings-view__logo settings-view__logo--yarn" src="/assets/images/yarn-logo.svg" alt="yarn logo"/>
          <div className="settings-view__text settings-view__or">OR</div>
          <img className="settings-view__logo settings-view__logo--npm" src="/assets/images/npm-logo.svg" alt="npm logo"/>
        </div>
      </div>
    );
  }
}

export default withRouter(SettingsView);