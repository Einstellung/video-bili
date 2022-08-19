import { Express } from "express";
import { DocService } from "./serviceDoc";

export function router(app: Express) {
  app.post("/code-project", async (req, res) => {
    const { projectName, projectDetail } = req.body
    const docSvc = new DocService("code-project", { projectName })
    await docSvc.put(projectDetail)

    // const DocGetVal = await docSvc.get()
    // console.log("🚀 ~ file: router.ts ~ line 11 ~ app.post ~ DocGetVal", DocGetVal)
    // if(DocGetVal) {
    //   // @ts-ignore
    //   for(let val of DocGetVal.fileTree.children) {
    //     console.log("🚀 ~ file: router.ts ~ line 15 ~ app.post ~ val", val)
    //   }
    // }
  })

  app.get("/code-project/:projectName", async (req, res) => {
    const docSvc = new DocService("code-project", req.params)
    const result = await docSvc.get()
    res.send({
      result
    })
  })
}