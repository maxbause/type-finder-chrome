import GitAPI from "../api/gitAPI";
import GitProvider from "../api/gitProvider";
import NPMApi from "../api/npm/npmApi";
import PackageResolver from "./packageResolver";
import { ISearchResult, PackageState } from "../container/PackageResolverContainer";

export default class GitPackageResolver extends PackageResolver {
  private gitProvider: GitAPI;

  constructor(location: Location) {
    super();
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
        const packageNameFromReadme = await this.gitProvider.packageNameFromReadme();

        if (!packageName && !packageNameFromReadme && containsTypescript) {
          return resolve({
            packageName: "",
            latestVersion: "",
            license: "",
            packageState: PackageState.INCLUDED,
          });
        }

        if (!packageName && !packageNameFromReadme) {
          return resolve(failedResponse);
        }

        const npmSearchResultPackageJson = await NPMApi.searchForTypeDef(packageName);
        const npmSearchResultReadme = await NPMApi.searchForTypeDef(packageNameFromReadme);

        if (!npmSearchResultPackageJson && !npmSearchResultReadme && containsTypescript) {
          return resolve({
            packageName: "",
            latestVersion: "",
            license: "",
            packageState: PackageState.INCLUDED,
          });
        }

        if (!npmSearchResultPackageJson && !npmSearchResultReadme) {
          return resolve(failedResponse);
        }

        return resolve({
          packageState: PackageState.FOUND,
          ...(npmSearchResultPackageJson ? npmSearchResultPackageJson : npmSearchResultReadme),
        });
      } catch {
        resolve(failedResponse);
      }
    });
  }
}