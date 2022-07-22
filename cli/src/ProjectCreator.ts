import chalk from "chalk"
import fs from "fs"
import inquirer from "inquirer"
import path from "path"
import Project from "./Project"

export default class ProjectCreator{
  public async create() {
    const projectName = await this.inputProjectName()
    const projectType = await this.inputProjectType()

    const project = new Project()
    if(!fs.existsSync(path.resolve(project.getCwd(), projectName))) {
      fs.mkdirSync(path.resolve(project.getCwd(), projectName))
    }

    project.setCwd(path.resolve(project.getCwd(), projectName))

    switch(projectType) {
      case "react+ts":
        this.copyReactTemplateFiles(project, projectName)
    }
  }

  private copyReactTemplateFiles(project: Project, projectName: string) {
    console.log(chalk.gray("copy files..."))
    const tplBase = path.resolve(__dirname, "../templates/react-ts")
    const envs: Record<string, string> = {}
    envs["PROJECT_NAME"] = projectName
    this.recursiveCopy(tplBase, project.getCwd(), envs)
  }

  private recursiveCopy(from: string, to: string, envs: Record<string, string>) {
    if(!fs.existsSync(to)) {
      fs.mkdirSync(to)
    }

    const files = fs.readdirSync(from)
    files.forEach(file => {
      const fullNameFrom = path.resolve(from, file)
      const fullNameTo = path.resolve(to, file)

      if(fs.statSync(fullNameFrom).isDirectory()) {
        return this.recursiveCopy(fullNameFrom, fullNameTo, envs)
      }

      if(fullNameFrom.match(/.(json)/)) {
        const content = fs.readFileSync(fullNameFrom, "utf-8")
          .replace(/\{\{.*\}\}/g, (x) => {
            x = x.replace("{{", "")
            x = x.replace("}}", "")
            x = x.trim()
            // 从env中拿值，专门替换project name
            return envs[x]
        })
        fs.writeFileSync(fullNameTo, content, "utf-8")
      } else {
        fs.copyFileSync(fullNameFrom, fullNameTo)
      }
    })
  }

  private async inputProjectName(): Promise<string> {
    const result = await inquirer.prompt({
      name: "name",
      message: "What's your project name:",
      type: "input",
    })
    if(!result.name) {
      return await this.inputProjectName()
    }
    return result.name
  }

  private async inputProjectType(): Promise<string> {
    const result = await inquirer.prompt({
      name: "type",
      message: "What's your project type:",
      default: "react+ts",
      type: "list",
      choices: ["react+ts", "vue+ts"],
    })
    return result.type
  }
}