import { useMemo } from "react";
import { ProjectEditorInst } from "./ProjectEditorInst";

export function useProjectEditor(projectName: string) {
  const editor = useMemo(() => new ProjectEditorInst(projectName), [])

  return editor
}