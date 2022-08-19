import Editor from "@monaco-editor/react"
import classes from "./code.module.scss"

export const CodeEditor = () => {
  return (
    <div className={classes['code-editor']}>
      <Editor language='typescript' theme="vs-dark" options={{
        fontSize: 28
      }}/>
    </div>
  )
}