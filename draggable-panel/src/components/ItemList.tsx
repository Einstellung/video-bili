import { Editor } from "../object/Editor"
import Metas from "../object/Metas"
import { Actions } from "../types/editor.types"
import classes from "./drag-drop.module.scss"

export default ({editor}: {editor: Editor}) => {
  return (
    <div class={classes['item-list']}>
      {
        Metas.map(item => {
          return(
            <div class={classes['item']} key={item.type}
              draggable={true}
              onDragstart={e => {
                editor.dispatch(Actions.StartAddComponent, item)
              }}
            >
              {item.title}
            </div>
          )
        })
      }
    </div>
  )
}