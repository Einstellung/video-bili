import { CodeProjectUpload } from "./CodeProjectUpload";

async function run() {
  await CodeProjectUpload.createTemplates()
}

run()