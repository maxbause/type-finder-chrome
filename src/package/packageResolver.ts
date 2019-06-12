import GitAPI from "../api/gitAPI";
import GitProvider from "../api/gitProvider";
import NPMApi from "../api/npm/npmApi";
import { ISearchResult, PackageState } from "../container/PackageResolverContainer";

export default class PackageResolver {
  private gitProvider: GitAPI;

  constructor(location: Location) {
    this.gitProvider = new GitProvider(location).getProvider;
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
        const containsTypescript = await this.gitProvider.containsTypescript();
        const packageName = await this.gitProvider.packageNameFromPackageJson();

        if (!packageName && containsTypescript) {
          return resolve({
            packageName: "",
            latestVersion: "",
            license: "",
            packageState: PackageState.INCLUDED,
          });
        }

        if (!packageName) {
          return resolve(failedResponse);
        }

        const npmSearchResult = await NPMApi.searchForTypeDef(packageName);

        if (!npmSearchResult && containsTypescript) {
          return resolve({
            packageName: "",
            latestVersion: "",
            license: "",
            packageState: PackageState.INCLUDED,
          });
        }

        if (!npmSearchResult) {
          return resolve(failedResponse);
        }

        return resolve({
          packageState: PackageState.FOUND,
          ...npmSearchResult
        });
      } catch {
        resolve(failedResponse);
      }
    });
  }
}