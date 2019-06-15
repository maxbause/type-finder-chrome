import { ISearchResult } from "../container/PackageResolverContainer";

export default abstract class PackageResolver {
  public abstract async searchForType(): Promise<ISearchResult>;
}