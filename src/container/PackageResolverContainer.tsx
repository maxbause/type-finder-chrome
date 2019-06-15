import * as React from "react";
import PackageResolver from "../package/packageResolver";
import { IMessage, MessageTypes } from "../inject";
import { INPMRegistryResult } from "../api/npm/npmApi";

export enum PackageState {
  LOADING,
  FOUND,
  FAILED,
  INCLUDED,
}

export interface ISearchResult extends INPMRegistryResult {
  packageState: PackageState;
}

interface IState extends ISearchResult {}

export default function withPackageResolver(WrappedComponent: React.ComponentClass<ISearchResult>): React.ComponentClass {
  return class extends React.Component<any, IState> {
    constructor(props: any) {
      super(props);

      this.state = {
        packageState: PackageState.LOADING,
        packageName: "",
        latestVersion: "",
        license: "",
      };
    }

    public componentWillMount() {
      const failedResponse = {
        packageState: PackageState.FAILED,
        packageName: "",
        latestVersion: "",
        license: "",
      };

      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const message: IMessage<any> = {
          type: MessageTypes.REQUEST_LOCATION,
        };
        chrome.tabs.sendMessage(tabs[0].id, message, (message: IMessage<Location>) => {
          if (message && message.type === MessageTypes.SEND_LOCATION) {
            const packageResolver = new PackageResolver(message.payload);
            packageResolver.searchForType()
              .then((result) => {
                this.setState(result);
              })
              .catch(() => {
                this.setState(failedResponse);
              });
          } else {
            this.setState(failedResponse);
          }
        });
      });
    }

    public render() {
      return(
        <WrappedComponent {...this.props} {...this.state} />
      );
    }
  }
}
