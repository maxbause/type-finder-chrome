import * as React from "react";
import withSettings, { ISettings, Settings } from "../container/SettingsContainer";
import "./settings-view.scss";

class SettingsView extends React.Component<ISettings> {
  public render() {
    const yarnClasses = ["settings-view__logo", "settings-view__logo--yarn"];
    const npmClasses = ["settings-view__logo", "settings-view__logo--npm"];

    if (this.props.packageCLI === "yarn") {
      yarnClasses.push("settings-view__logo--active");
    } else if (this.props.packageCLI === "npm") {
      npmClasses.push("settings-view__logo--active");
    }

    return (
      <div className="settings-view">
        <div className="settings-view__text">I am using:</div>
        <div className="settings-view__logo-wrapper">
          <img onClick={this.setPackageCLI.bind(this, "yarn")} className={yarnClasses.join(" ")} src="/assets/images/yarn-logo.svg" alt="yarn logo"/>
          <div className="settings-view__text settings-view__or">OR</div>
          <img onClick={this.setPackageCLI.bind(this, "npm")} className={npmClasses.join(" ")} src="/assets/images/npm-logo.svg" alt="npm logo"/>
        </div>
      </div>
    );
  }

  private setPackageCLI(cli: string) {
    this.props.saveSetting(Settings.PACKAGE_CLI, cli);
  }
}

export default withSettings(SettingsView);