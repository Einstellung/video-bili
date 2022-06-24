export enum States {
  Start,
  DragStart,
  Moving,
  Stoped,
  Selected,
  PlacingComponent, // 进行拖拽的过程称之为placing
  AddingComponent   // 松手放置的过程称之为adding
}

export enum Actions {
  AUTO = "<auto>",
  EvtDragStart = 0,
  EvtDrag,
  EvtDrop,
  EvtDragEnd,
  StartAddComponent,
}


export type DragData = {
	dragging : boolean,
	startX : number,
	startY : number,
	x : number,
	y : number,
	diffX : number,
	diffY : number
}

export type Meta = {
  type : string,
  w : number,
  h : number
}