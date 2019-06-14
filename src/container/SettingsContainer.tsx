import * as React from "react";

export enum Settings {
  PACKAGE_CLI="package-cli",
}

interface IState {
  [Settings.PACKAGE_CLI]: string;
}

export interface ISettings {
  saveSetting: (setting: Settings, value: any) => void;
  getSetting: (setting: Settings, callback: (value: string) => void) => void;
  packageCLI: string;
}

export default function withSettings(WrappedComponent: React.ComponentClass<ISettings>): React.ComponentClass {
  return class extends React.Component<{}, IState> {
    constructor(props: any) {
      super(props);

      if (!localStorage.getItem(Settings.PACKAGE_CLI)) {
        localStorage.setItem(Settings.PACKAGE_CLI, "yarn");
      }

      this.state = {
        [Settings.PACKAGE_CLI]: localStorage.getItem(Settings.PACKAGE_CLI),
      }
    }

    public render() {
      return(
        <WrappedComponent
          {...this.props}
          saveSetting={this.onSaveSetting.bind(this)}
          getSetting={this.onGetSetting.bind(this)}
          packageCLI={this.state[Settings.PACKAGE_CLI]} />
      );
    }

    private onSaveSetting(setting: Settings, value: any) {
      this.setState({[setting]: value});
      localStorage.setItem(setting, value);
    }

    private onGetSetting(setting: Settings, callback: (value: string) => void) {
      callback(localStorage.getItem(setting));
    }
  }
}
