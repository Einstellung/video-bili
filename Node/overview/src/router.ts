import path from "path"
import * as fs from "fs"
import type { Express } from "express";


class Cache {
  static singleton = new Cache();
  private items = {}

  public static getCache() {
    return this.singleton
  }

  public get(key: string) {
    return this.items[key]

  }

  public set(key: string, value: string) {
    this.items[key] = value
  }
}

export function router(app: Express) {
  app.get("/", (req, res) => {
      if(!!Cache.getCache().get("index.html")) {
        Cache.getCache().set("index.html", fs.readFileSync(path.join(__dirname, "../public/index.html"), "utf8"));
      }
      res.send(Cache.getCache().get("index.html"))
    });
  
  app.get("/xyz", (req, res) => {
    res.send("ok")
  })
}