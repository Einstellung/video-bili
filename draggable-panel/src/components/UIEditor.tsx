import { defineComponent, provide } from "vue";
import ItemList from "./ItemList";
import classes from "./drag-drop.module.scss";
import { Panel } from "./Panel";
import { Editor } from "../object/Editor";

export default defineComponent({
  setup() {

    const editor = new Editor()
    provide("editor", editor)

    return () => {
      return (
        <div class={classes.page}>
          <ItemList editor={editor}/>
          <Panel editor={editor} />
        </div>
      )
    }
  }
})