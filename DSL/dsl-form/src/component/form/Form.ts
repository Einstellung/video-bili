import { fromJS, Map } from "immutable";
import { FormDSL } from "./form.types";
import FormNode from "./FormNode";

export default class Form {
  private root
  private data
  constructor(dsl: FormDSL, initialValue?:any) {
    this.root = FormNode.FromDSL(dsl, this)
    this.data = fromJS(initialValue || {}).toMap() as Map<string, any>
  }

  getRoot() {
    return this.root
  }

  setDataChange(path: (string | number)[], val:any) {
    this.data = this.data.setIn(path, val)
  }

  getValues() {
    return this.data.toJS()
  }
}