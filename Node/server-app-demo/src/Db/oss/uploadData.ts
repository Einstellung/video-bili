import axios from "axios";

export interface POSTOSS {
  fileName: string,
  content: string
}

async function UploadData(fileName: string, content: string) {
  try {
    await axios.post("http://localhost:4003/by-content", {
      fileName: fileName,
      content: content
    })
  } catch(e) {
    console.log("error ", e)
  }
}

UploadData("src/upload.txt", "这是一个测试")