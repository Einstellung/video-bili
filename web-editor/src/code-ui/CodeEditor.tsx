import Editor from "@monaco-editor/react"
import classes from "./code.module.scss"

const extToLang = {
  "ts" : "typescript",
  "json" : "json"
}

export type fileType = "ts" | "json"
export const CodeEditor = ({fileType, fileContent}: {
  fileType: fileType,
  fileContent: string
}) => {
  return (
    <div className={classes['code-editor']}>
      <Editor 
      language={extToLang[fileType || "typescript"]}
      value={extToLang[fileType] === "json" ? JSON.stringify(fileContent) : fileContent}
      theme="vs-dark" 
      options={{
        fontSize: 28
      }}/>
    </div>
  )
}