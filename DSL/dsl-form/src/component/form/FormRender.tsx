import FormNode from "./FormNode";

export const FormRender = ({node}: {node: FormNode}) => {
  const type = node.getType()

  switch(type) {
    case "input":
      return <Input label={node.getProps("label")} 
        onChange={val => node.onDataChange(val)}
        />
    case "branch":
    case "form":
      return <div>
        {node.getChildren()?.map((child, i) => <FormRender node={child} key={i}/>)}
      </div>
    case "form-group":
      return <div>
        {node.getChildren()?.map((child, i) => <FormRender node={child} key={i}/>)}
      </div>
    case "single-choice":
      return <SingleChoice label={node.getProps("label")}
      selection={node.getProps("selection")}
      onChange={val => node.onDataChange(val)}/>
    default:
      return null
  }
}

const Input = ({label, onChange}:{
  label: string,
  onChange: (val:any) => void
}) => {
  return <div>
    <label >{label}</label>
    <input onChange={e => {
      onChange(e.target.value)
    }} />
  </div>
}

type SelectOption = {
  label: string,
  value: any
}

const SingleChoice = ({label, selection, onChange}:{
  label: string,
  selection: SelectOption[],
  onChange: (val:any) => void
}) => {
  return <div>
    <label >{label}</label>
    <select onChange={e => {
      onChange(e.target.value)
    }}>
      {
        selection.map(option => {
          return <option value={option.value} key={option.value}>
            {option.label}
          </option>
        })
      }
    </select>
  </div>
}