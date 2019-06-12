import Axios from "axios";
import GitAPI from "../gitAPI";

export default class GithubAPI extends GitAPI {
  constructor(repoPath: string) {
    super(repoPath);
  }

  public async packageNameFromPackageJson(): Promise<string> {
    return new Promise(async (resolve) => {
      try {
        const request = await Axios({
          headers: {
            "Content-Type": "application/json"
          },
          url: `https://api.github.com/repos${this.repoPath}/contents/package.json`,
          method: "GET",
        });

        if (!request.data || !request.data.content) {
          return resolve("");
        }

        const encodedData = JSON.parse(atob(request.data.content));
        resolve(encodedData.name);
      } catch {
        resolve("");
      }
    });
  }

  public async containsTypescript(): Promise<boolean> {
    return new Promise(async (resolve) => {
      try {
        const request = await Axios({
          headers: {
            "Content-Type": "application/json"
          },
          url: `https://api.github.com/repos${this.repoPath}/languages`,
          method: "GET",
        });

        if (!request.data) {
          return resolve(false);
        }

        resolve(Object.keys(request.data).indexOf("TypeScript") > -1);
      } catch {
        resolve(false);
      }
    });
  }
}
