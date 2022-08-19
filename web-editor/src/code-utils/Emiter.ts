type Handler = (data: any) => void

export class Emiter {

  private topics: Map<string, Handler[]> = new Map()

  private getTopics(topic: string) {
    if(!this.topics.get(topic)) {
      this.topics.set(topic, [])
    }

    return this.topics.get(topic)!
  }

  on(topic: string | string[], handler: Handler) {
    if(Array.isArray(topic)) {
      topic.forEach(t => {
        const handlers = this.getTopics(t)
        handlers.push(handler)
      })
    } else {
      const handlers = this.getTopics(topic)
      handlers.push(handler)
    }

    return () => {
      if(Array.isArray(topic)) {
        topic.forEach(t => {
          this.topics.set(t, this.getTopics(t).filter(x => x !== handler))
        })
      } else {
        this.topics.set(topic, this.getTopics(topic).filter(x => x !== handler))
      }
    }
  }

  emit(topic: string, data?: any) {
    const handlers = this.getTopics(topic)
    handlers.forEach(h => {
      h(data)
    })
  }
}