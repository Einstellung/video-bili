import Form from "./Form";
import { FormDSL } from "./form.types";

export default class FormNode {
  private children
  constructor(private dsl: FormDSL, private form: Form) {
    this.children = dsl.children?.map(child => new FormNode(child, form))
  }

  getType() {
    return this.dsl.type
  }

  getProps(key: string) {
    return this.dsl.props?.[key]
  }

  getChildren() {
    return this.children
  }

  onDataChange(val:any) {
    if(this.dsl.path) {
      this.form.setDataChange(this.dsl.path, val)
    }
  }

  static FromDSL(dsl: FormDSL, form: Form) {
    return new FormNode(dsl, form)
  }
}