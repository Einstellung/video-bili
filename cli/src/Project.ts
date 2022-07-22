import ProjectCreator from "./ProjectCreator"

export default class Project {
  private cwd: string
  constructor() {
    this.cwd = process.cwd()
  }

  public getCwd() {
    return this.cwd
  }

  public setCwd(cwd: string) {
    this.cwd = cwd
    process.chdir(this.cwd)
  }

  public static async create() {
    const creator = new ProjectCreator()
    await creator.create()
  }
}