import { DataTypes, Model, Optional } from "sequelize"
import { Db } from "./Db"

import { OSSResult } from "../Service"
type id = {
  id: string
}
type SqliteData = Omit<OSSResult, "res">
interface SqliteModel extends SqliteData, id {}


interface SqliteType extends Optional<SqliteModel, "id">{}

export class Sqlite extends Model<SqliteModel, SqliteType> {
  public id!: number
}

Sqlite.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  }
}, {
  sequelize: Db.getDb(),
  modelName: "Sqlite",
  tableName: "Sqlite"
})

