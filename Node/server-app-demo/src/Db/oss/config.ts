import OSS from "ali-oss"

export const client = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: "LTAI5tPBjkHyLQB6XZoAC2mq",
  accessKeySecret: "SOKqyjpvJ1osxToE5D89PrNweTNZd6",
  bucket: "code-project-save"
})