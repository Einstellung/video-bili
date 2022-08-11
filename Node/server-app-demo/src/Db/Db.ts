import path from "path"
import { Sequelize } from "sequelize"

export class Db {
  private static inst: Db

  private db: Sequelize
  constructor() {
    this.db = new Sequelize({
      dialect: "sqlite",
      database: "sqlite",
      storage: path.resolve(__dirname, "./data.db")
    })
  }

  public static getDb() {
    if(!this.inst) {
      this.inst = new Db()
    }
    return this.inst.db
  }
}