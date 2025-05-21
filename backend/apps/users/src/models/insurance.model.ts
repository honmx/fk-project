import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

interface InsuranceCreationAttrs {
  photo?: string;
  expires?: string;
}

@Table({ tableName: "insurance" })
export class Insurance extends Model<Insurance, InsuranceCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({ type: DataType.TEXT, allowNull: true })
  photo: string;
  
  @Column({ type: DataType.TEXT, allowNull: true })
  expires: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}