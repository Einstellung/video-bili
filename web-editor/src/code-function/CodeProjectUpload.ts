import axios from "axios"
import * as fs from "fs"
import path from "path"
import { CodeProject, FileTreeNode } from "../code-model"
import { uploadOSS } from "../code-server/serviceUpload"

export class CodeProjectUpload {
  constructor(private cwd: string) {
  }

  private createFileNode(cwd: string, name: string) {
    const files = fs.readdirSync(cwd)
    const fNode = new FileTreeNode("dir", name)

    for(let file of files) {
      const fullPath = path.resolve(cwd, file)
      if(fs.statSync(fullPath).isDirectory()) {
        fNode.add(this.createFileNode(fullPath, file))
      } else {
        const fileNode = new FileTreeNode("file", file)
        fileNode.setContent(fs.readFileSync(fullPath, "utf-8"))
        fNode.add(fileNode)
      }
    }
    return fNode
  }

  public async upload(project: CodeProject) {
    const fNode = this.createFileNode(this.cwd, "")
    
    const shouldUpdate = [...fNode.find(x => x.isDirty())]
    console.log(`found ${shouldUpdate.length} should update`)

    for(let file of shouldUpdate) {
      const { url } = await uploadOSS(file.getFileName(), file.getContent())
      file.setUrl(url)
    }

    project.setRoot(fNode)
    const json = project.toJSON()

    await axios.post("http://localhost:4003/code-project", {
      projectName: project.getName(),
      projectDetail: json
    })
  }

  public static async createTemplates() {
    const project = new CodeProject("codeless")
    const fs = new CodeProjectUpload(path.relative(__dirname, "./template/codeless"))
    await fs.upload(project)
  }
}