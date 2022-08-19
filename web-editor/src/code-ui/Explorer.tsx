import { useContext } from "react"
import { EditorContext } from "./ProjectEditor"
import { FileTreeNode } from "../code-model"
import classes from "./code.module.scss"

export const Explorer = () => {

  const editor = useContext(EditorContext)!

  return (
    <div className={classes.explorer}>
      <FileItem file={ editor.getProject().getRoot() }/>
    </div>
  )
}

const FileItem = ({file}: {
  file: FileTreeNode
}) => {
  if(file.getType() === "file") {
    return (
      <div className={classes['editor-file']}>
        {file.getFileName()}
      </div>
    )
  }

  return (
    <div className={classes['editor-dir']}>
      <div>{file.getFileName()}</div>
      {
        file.getChildren().map((x,i) => {
          return <FileItem file={x} key={i}/>
        })
      }
    </div>
  )
}