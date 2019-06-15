import GitPackageResolver from "./gitPackageResolver";
import NPMPackageResolver from "./npmPackageResolver";
import PackageResolver from "./packageResolver";

export default class PackageResolverProvider {
  constructor(private location: Location) {}

  public get getProvider(): PackageResolver {
    switch(this.location.host) {
      case "github.com": {
        return new GitPackageResolver(this.location);
      }
      case "www.npmjs.com": {
        return new NPMPackageResolver(this.location);
      }
      default: {
        throw new Error("Unsupported source");
      }
    }
  }
}