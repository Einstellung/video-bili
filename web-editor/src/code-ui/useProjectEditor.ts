import { useEffect, useMemo, useState } from "react";
import { Topic } from "../code-utils";
import { ProjectEditorInst } from "./ProjectEditorInst";

export function useProjectEditor(projectName: string) : [
  ProjectEditorInst, number, string, string
] {
  const editor = useMemo(() => new ProjectEditorInst(projectName), [])

  const [ver, setVer] = useState(0)
  const [fileContent, setFileContent] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    editor.on(Topic.Loaded, () => {
      setVer(x => x+1)
    })

    editor.on(Topic.fileChanged, (data: string) => {
      const content = editor.getSelectedFileContent(data)
      const fileType = data.split(".").pop() || ""

      setFileContent(content)
      setType(fileType)
    })
  })

  return [editor, ver, type, fileContent]
}