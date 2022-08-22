import OSS from "ali-oss"

export const client = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: "LTAI5t8agzzJK2ey1uwi4iwB",
  accessKeySecret: "wk17AjCKTgJWEQ75XOh9HcaQuBUtSt",
  bucket: "code-project-save"
})