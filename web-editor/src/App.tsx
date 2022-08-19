import { useState } from 'react'
import './App.css'
import { MonacoEditorExample } from './code-ui/example'
import { ProjectEditor } from './code-ui/ProjectEditor'

function App() {

  return (
    <div className="App">
      {/* <MonacoEditorExample></MonacoEditorExample> */}
      <ProjectEditor></ProjectEditor>
    </div>
  )
}

export default App
