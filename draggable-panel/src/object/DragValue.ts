export class DragValue {
  private startX = 0
  private startY = 0
  private diffX = 0
  private diffY = 0

  start(e: DragEvent) {
    this.startX = e.clientX
    this.startY = e.clientY
    this.diffX = 0
    this.diffY = 0
  }

  update(e: DragEvent) {
    this.diffX = e.clientX - this.startX
    this.diffY = e.clientY - this.startY
  }

  getDiffX() {
    return this.diffX
  }

  getDiffY() {
    return this.diffY
  }
} 