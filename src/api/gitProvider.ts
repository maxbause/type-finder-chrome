import GitAPI from "./gitAPI";
import GithubAPI from "./github/githubAPI";

export default class GitProvider {
  constructor(private location: Location) {}

  public get getProvider(): GitAPI {
    switch(this.location.host) {
      case "github.com": {
        return new GithubAPI(this.location.pathname);
      }
      default: {
        throw new Error("Unsupported git provider");
      }
    }
  }
}