import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CodeCreationAttrs {
  email: string;
  code: number;
}

@Table({ tableName: "codes" })
export class Code extends Model<Code, CodeCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TEXT, unique: true })
  email: string;

  @Column({ type: DataType.INTEGER })
  code: number;
}