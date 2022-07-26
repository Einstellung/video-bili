import React from 'react'
import ReactDOM from 'react-dom'
import { FormRender } from './component/form'
import { useForm } from './component/form/useForm'
import userForm from './user.form'

function App () {
  const form = useForm(userForm)
  return <div>
    <FormRender node={form.getRoot()} />
    <button onClick={() => {
      console.log(form.getValues())
    }}>
    提交
    </button>
  </div>
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
