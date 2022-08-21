import Editor from "@monaco-editor/react"
import { useContext } from "react"
import { Topic } from "../code-utils"
import classes from "./code.module.scss"
import { EditorContext } from "./ProjectEditor"

const extToLang = {
  "ts" : "typescript",
  "json" : "json"
}

export type fileType = "ts" | "json"
export const CodeEditor = ({fileType, fileContent}: {
  fileType: fileType,
  fileContent: string
}) => {
  const editor = useContext(EditorContext)!
  return (
    <div className={classes['code-editor']}>
      <Editor 
      language={extToLang[fileType || "typescript"]}
      value={extToLang[fileType] === "json" ? JSON.stringify(fileContent) : fileContent}
      theme="vs-dark"
      onChange={changeContent => {
        editor.emit(Topic.fileChanged, changeContent)
      }}
      options={{
        fontSize: 28
      }}/>
    </div>
  )
}