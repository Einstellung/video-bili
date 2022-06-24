type StateTransferFunction = (...args: any[]) => void

export class StateMachine<
  S extends string | number,
  A extends string | number
> {
  private state: S
  private transferTable: Map<S, Map<A, [StateTransferFunction, S]>>


  constructor(initialState: S) {
    this.state = initialState
    this.transferTable = new Map()
  }

  addTransfer(from: S, to: S, action: A, fn: StateTransferFunction) {
    if(!this.transferTable.has(from)) {
      this.transferTable.set(from, new Map())
    }

    const adjTable = this.transferTable.get(from)
    adjTable?.set(action, [fn, to])
  }

  register(from: S | S[], to: S, action: A, fn: StateTransferFunction) {
    if(Array.isArray(from)) {
      from.forEach(f => {
        this.addTransfer(f, to, action, fn)
      })
    } else {
      this.addTransfer(from, to, action, fn)
    }
  }

  dispatch(action: A, ...data: any[]) {
    const adjTable = this.transferTable.get(this.state)

    const transfer = adjTable?.get(action)

    if(!transfer) {
      return false
    }
    const [fn, nextS] = transfer
    fn(...data)
    this.state = nextS

    while(this.dispatch("<auto>" as A, ...data))
    return true
  }
}