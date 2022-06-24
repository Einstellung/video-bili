import { defineComponent, ref, VNode, PropType } from "vue";
import { DragValue } from "../object/DragValue";
import { deepMerge } from "../util/deepMerge";

function addPropsToVNode(vNode: VNode, props: Record<string, any>) {
  vNode.props = deepMerge(vNode.props, props)
  return vNode
}

function useDrag({onDragstart, onDragend}: {
  onDragstart?: () => void
  onDragend?: (vec: [number, number]) => void
}) {

  const value = new DragValue()
  const diffX = ref(value.getDiffX())
  const diffY = ref(value.getDiffY())
  const handlers = {
    ondragstart(e: DragEvent) {
      value.start(e)
      onDragstart && onDragstart()
    },
    ondrag(e: DragEvent) {
      value.update(e)
      diffX.value = value.getDiffX()
      diffY.value = value.getDiffY()
    },
    ondragend(e: DragEvent) {
      value.update(e)
      onDragend && onDragend([value.getDiffX(), value.getDiffY()])
    }
  }

  return { handlers, diffX, diffY }
}

export const Draggable = defineComponent({
  props: {
    initialPosition: {
      type: Array as any as PropType<[number, number]>
    },
    onDragstart: {
      type: Function as PropType<() => void>
    },
    onDragend: {
      type: Function as PropType<(vec: [number, number]) => void>
    }
  },
  setup(props, ctx) {
    const { handlers, diffX, diffY } = useDrag({
      onDragstart: props.onDragstart,
      onDragend: props.onDragend
    })

    return () => {
      let vNode = ctx.slots.default!()[0]

      vNode = addPropsToVNode(vNode, {
        ...handlers,
        Draggable: true,
        style: {
          position: "absolute",
          left: (props.initialPosition?.[0] || 0) + "px",
          top: (props.initialPosition?.[1] || 0) + "px",
          transform: `translate(${diffX.value}px, ${diffY.value}px)`
        }
      })

      return vNode
    }
  }
})