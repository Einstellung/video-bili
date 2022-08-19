import { useEffect, useMemo, useState } from "react";
import { Topic } from "../code-utils";
import { ProjectEditorInst } from "./ProjectEditorInst";

export function useProjectEditor(projectName: string) : [
  ProjectEditorInst, number
] {
  const editor = useMemo(() => new ProjectEditorInst(projectName), [])

  const [ver, setVer] = useState(0)

  useEffect(() => {
    editor.on(Topic.Loaded, () => {
      setVer(x => x+1)
    })
  })

  return [editor, ver]
}