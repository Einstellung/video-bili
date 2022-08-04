## 路由层

路由层作用：

- 分发流量
- 对接HTTP协议以及相关规范（如restful）

路由层简单示例

```js
const app = express()

app.get('/xyz', (req, res) => {

})
app.get('/', (req, res) => {
  
})
```

写成函数形式：

```js
export function router(app: Express) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"))
  })

  app.get('/xyz', (req, res) => {
    res.send("ok")
  })
}
```

这是从文件中读取，效率比较低，也可以使用内存

```typescript
class Cache {
  static inst = new Cache()
  private items = {}

  public static getCache() {
    return this.inst
  }

  public get(key: string) {
    return this.items[key]
  }

  public set(key: string, value: string) {
    this.items[key] = value
  }

  public has(key: string) {
    return !!this.items[key]
  }
}

export function router(app: Express) {
  app.get('/', (req, res) => {
    if(!!Cache.getCache().has("index.html")) {
      Cache.getCache().set("index.html", 
        fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8"))
    }
    res.send(Cache.getCache().get("index.html"))
  })

  app.get('/xyz', (req, res) => {
    res.send("ok")
  })
}
```

路由一般就是分发流量和控制