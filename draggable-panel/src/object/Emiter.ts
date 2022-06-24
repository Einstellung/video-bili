import { Observable } from "rxjs";


type ObserverFunction = (data: any) => void
export class Emiter<Topic extends string | number> {
  private observers: Map<Topic, ObserverFunction[]>

  constructor() {
    this.observers = new Map()
  }

  addObserverFunction(topic: Topic, fn: ObserverFunction) {
    if(!this.observers.has(topic)) {
      this.observers.set(topic, [])
    }
    this.observers.get(topic)?.push(fn)
  }

  on(topic: Topic | Topic[]) {
    return new Observable(observer => {
      if(Array.isArray(topic)) {
        topic.forEach(t => {
          this.addObserverFunction(t, (data) => {
            observer.next(data)
          })
        })
      } else {
        this.addObserverFunction(topic, (data) => {
          observer.next(data)
        })
      }
    })
  }

  emit(topic: Topic, data?: any) {
    this.observers.get(topic)?.forEach(fn => {
      fn(data)
    })
  }
}