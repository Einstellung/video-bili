import chalk from 'chalk'
import express, {Express}  from 'express'
import { projPathResolve } from './resolver'
export default class ProjectDevServer {
  private app: Express
  constructor(private port: number) {
    this.app = express()
  }

  start() {
    this.app.get('/', (req:any, res:any) => {
      res.sendFile(projPathResolve("index.html"))
    })

    this.app.use('/', express.static(projPathResolve('./build')))

    this.app.listen(this.port, () => {
      console.log(chalk.greenBright("successfully listen @" + this.port))
    })
  }
}