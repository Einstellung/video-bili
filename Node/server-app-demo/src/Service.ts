import OSS from "ali-oss";
import { putStream } from "./Db/oss/serviceoss";
import { Sqlite } from "./Db/sqlite";

export interface OSSResult {
  name: string,
  res: OSS.NormalSuccessResponse,
  url: string
}

export class UploadService {
  public async uploadOSS(fileName: string, content: string) {
    const result = await putStream(fileName, content)
    const { name, url } = result as OSSResult
    await Sqlite.create({
      name,
      url
    })
  }
}