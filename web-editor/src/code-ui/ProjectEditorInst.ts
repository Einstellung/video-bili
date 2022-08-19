import { CodeProject, FileTreeNode } from "../code-model";

export class ProjectEditorInst {
  private project: CodeProject

  constructor(prjectName: string) {
    // this.project = project
    this.project = mockProject()
  }

  public getProject() {
    return this.project
  }
}

function mockProject() {
  const root = FileTreeNode.FromJSON({
    type : "dir",
    fileName : 'root', 
    url : "",
    children : [{
      type : "dir",
      fileName : 'src',
      url : '',
      children : [{
        type : "file",
        fileName : 'index.ts',
        url : ''
      }]
    }, {
      type : 'file',
      fileName : 'package.json',
      url : ''
    }]    
  })
  const project = new CodeProject("mockFile")
  project.setRoot(root)
  return project
}