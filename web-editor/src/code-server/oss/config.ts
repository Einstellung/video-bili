import OSS from "ali-oss"

export const client = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: "LTAI5tPWGTVtPvFzEMKQs3KN",
  accessKeySecret: "nf7JNlG7AKtiEXE3rKXUhTtb2t7EcS",
  bucket: "code-project-save"
})