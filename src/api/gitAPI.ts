export default abstract class GitAPI {
  constructor(
    protected repoPath: string,
  ) {}
  public abstract async packageNameFromPackageJson(): Promise<string>;
  public abstract async packageNameFromReadme(): Promise<string>;
  public abstract async containsTypescript(): Promise<boolean>;
}