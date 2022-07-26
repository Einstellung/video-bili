import { FormDSL } from "./component/form"

const userForm: FormDSL = {
  type: "form",
  children: [
    {
      type: "form-group",
      children: [
        {
          type: "input",
          path: ["basic", "username"],
          props: {
            label: "用户名"
          }
        },
        {
          type: "single-choice",
          path: ["basic", "sex"],
          props: {
            label: "性别",
            selection: [
              {value: "male", label: "男"},
              {value: "female", label: "女"}
            ]
          }
        }
      ]
    },
    {
      type: "form-group",
      children: [
        {
          type: "branch",
          name: "branch-1",
          children: [
            {
              type: "single-choice",
              path: ["product", "color"],
              props: {
                label: "颜色",
                selection: [
                  {value: "red", label: "红色"},
                  {value: "blue", label: "蓝色"}
                ]
              }
            },
            {
              type: "single-choice",
              path: ["product", "shape"],
              props: {
                label: "形状",
                selection: [
                  {value: "box", label: "方形"},
                  {value: "circle", label: "圆形"}
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}

export default userForm