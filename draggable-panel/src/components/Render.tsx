import { defineComponent, inject, ref } from "vue";
import { Editor } from "../object/Editor";
import { Node } from "../object/Node";
import { Actions } from "../types/editor.types";
import { Topics } from "../types/Topics";
import { Draggable } from "./Draggable";

function render(node: Node) {
  const nodeType = node.getType()
  switch(nodeType){
    case "root":
      return <Root node={node}/>
    case "text":
    case "rect":
    case "image":
      return <ItemRenderForDraggable node={node}/>
    default:
      throw new Error(`unsupported node type: ${nodeType}`)
  }
}

function Root({node}: {node: Node}) {
  const children = node.getChildren()
  return(
    <div>
      {
        children.map((node, i) => {
          return <Render node={node} key={i}/>
        })
      }
    </div>
  )
}

function ItemRenderForDraggable({node}: {node: Node}) {
  const editor = inject("editor") as Editor
  return(
    <Draggable
      initialPosition={[node.getX(), node.getY()]}
      onDragstart={() => {
        console.log('drag start')
        // debugger
        editor.dispatch(Actions.EvtDragStart, node)
      }}
      onDragend={(vec) => {
        console.log('drag end')
        editor.dispatch(Actions.EvtDragEnd, vec)
      }}
    >
      {renderItem(node)}
    </Draggable>
  )
}

function renderItem(node: Node) {
  switch (node.getType()) {
    case "image":
      return (
        <img
          src={
            "https://pic3.zhimg.com/v2-03a9ec7147b2dd6a7d0d77b3b9c5455f_xl.jpg?source=32738c0c"
          }
        />
      )
    case "rect":
      return (
        <div
          style={{
            backgroundColor: "yellow",
            width: "100px",
            height: "100px"
          }}
        />
      )
    case "text":
      return <h2>这里是文本</h2>
  }
}

export const Render = defineComponent({
  props: {
    node: {
      type: Node,
      required: true
    }
  },
  setup({ node }) {
    const ver = ref(0)
    node.on([Topics.NodeChildrenUpdated, Topics.NodePositionMoved]).subscribe(() => {
      ver.value++
    })

    return () => {
      return <PanelRender key={ver.value} render={() => render(node)}/>
    }
  }
})

function PanelRender({render}: {render: () => JSX.Element}){
  return render()
}