import GitAPI from "../api/gitAPI";
import GitProvider from "../api/gitProvider";
import NPMApi from "../api/npm/npmApi";
import PackageResolver from "./packageResolver";
import { ISearchResult, PackageState } from "../container/PackageResolverContainer";

export default class NPMPackageResolver extends PackageResolver {
  constructor(private location: Location) {
    super();
  }

  public async searchForType(): Promise<ISearchResult> {
    return new Promise(async (resolve) => {
      const failedResponse: ISearchResult = {
        packageName: "",
        latestVersion: "",
        license: "",
        packageState: PackageState.FAILED,
      };

      try {
        const npmSearchResult= await NPMApi.searchForTypeDef(this.location.pathname.replace("/package/", ""));

        if (!npmSearchResult) {
          return resolve(failedResponse);
        }

        return resolve({
          packageState: PackageState.FOUND,
          ...npmSearchResult,
        });
      } catch {
        resolve(failedResponse);
      }
    });
  }
}