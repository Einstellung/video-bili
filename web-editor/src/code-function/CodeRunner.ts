import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { CodeProjectFS } from "./CodeProjectFS";

const execPromise = promisify(exec)

export class CodeRunner {
  constructor(private cwd: string, private projectName: string) {
  }

  private async prepare() {
    if(fs.existsSync(this.cwd)) {
      fs.rmdirSync(this.cwd, {
        recursive: true
      })
    }
    fs.mkdirSync(this.cwd)
  }

  private async build() {
    const projectFS = new CodeProjectFS(this.cwd)
    await projectFS.download(this.projectName)
    await execPromise("yarn", {
      cwd: this.cwd
    })
    await execPromise("tsc", {
      cwd: this.cwd
    })
  }

  public async run(fnName: string, ...args: any[]) {
    await this.prepare()
    await this.build()
    const module = require(path.resolve(this.cwd, "build/index.js"))
    const fn = module[fnName]
    return await fn(...args)
  }
}