import axios from "axios"
import * as fs from "fs"
import path from "path"
import { CodeProject, FileTreeNode, PorjectJSON } from "../code-model"
import { uploadOSS } from "../code-server/serviceUpload"
import fetch from "node-fetch"

export class CodeProjectFS {
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

  private async downloadFile(cwd: string, node: FileTreeNode) {
    if(node.getType() === "dir") {
      if(fs.existsSync(path.resolve(cwd, node.getFileName()))) {
        fs.rmdirSync(path.resolve(cwd, node.getFileName()), {
          recursive: true
        })
      }

      fs.mkdirSync(path.resolve(cwd, node.getFileName()))

      for(let child of node.getChildren()) {
        await this.downloadFile(path.resolve(cwd, node.getFileName()), child)
      }
    }

    // 下载文件内容到磁盘
    const url = node.getUrl()
    if(url) {
      const resp = await fetch(url)
      const content = await resp.text()
      node.setContent(content)
      node.saved()

      fs.writeFileSync(
        path.resolve(cwd, node.getFileName()),
        content,
        "utf-8"
      )
    }
  }

  public async download(projectName: string) {
    console.log("fs---download", projectName)
    const { data } = await axios.get(`http://localhost:4003/code-project/${projectName}`)

    const json: PorjectJSON = data.result
    const project = CodeProject.fromJSON(json)

    // 将文件下载到本地磁盘并创建对应的目录结构
    await this.downloadFile(this.cwd, project.getRoot())
  }

  public static async createTemplates() {
    const project = new CodeProject("codeless")
    const fs = new CodeProjectFS(path.relative(__dirname, "./template/codeless"))
    await fs.upload(project)
  }
}