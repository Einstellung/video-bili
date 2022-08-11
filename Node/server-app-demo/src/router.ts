import { Express } from "express";
import path from "path";
import fs from "fs"
import { UploadService } from "./Service";

class Cache {
  private static instance: Cache
  private items = {}
  public static getCache() {
    if(!this.instance) {
      this.instance = new Cache()
    }
    return this.instance
  }

  public get(key: string) {
    return this.items[key]
  }

  public set(key: string, value: string) {
    this.items[key] = value
  }
}

export function router(app: Express) {
  app.get('/', (req, res) => {
    if(!Cache.getCache().get("index.html")) {
      Cache.getCache().set("index.html", 
        fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8")
      )
    }
    res.send(Cache.getCache().get("index.html"))
  })

  app.post("/by-content", (req, res) => {
    const { fileName, content } = req.body
    const service = new UploadService()
    service.uploadOSS(fileName, content)
  })
}