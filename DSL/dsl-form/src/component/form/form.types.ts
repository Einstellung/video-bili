export type FormDSL = {
  type: string,
  name?: string,
  path?: (string | number)[],
  props?: any,
  children?: FormDSL[]
}