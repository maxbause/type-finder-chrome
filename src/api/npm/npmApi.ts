import Axios from "axios";

export interface INPMRegistryResult {
  packageName: string;
  latestVersion: string;
  license: string;
}

export default class NPMApi{
  public static async searchForTypeDef(packageName: string): Promise<INPMRegistryResult|undefined> {
    return new Promise(async (resolve) => {
      try {
        const request = await Axios({
          headers: {
            "Content-Type": "application/json"
          },
          url: `https://registry.npmjs.org/@types/${packageName}`,
          method: "GET",
        });

        if (!request.data) {
          return resolve(undefined);
        }

        const latestVersion: string = request.data["dist-tags"].latest;
        resolve({
          latestVersion,
          packageName: request.data.versions[latestVersion].name,
          license: request.data.versions[latestVersion].license
        });
      } catch {
        resolve(undefined);
      }
    });
  }
}