import Form from "./Form";
import { FormDSL } from "./form.types";

export function useForm(dsl: FormDSL) {
  return new Form(dsl)
}