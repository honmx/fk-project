import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { User } from "./user.model";

@Table({ tableName: "roles", timestamps: false })
export class Role extends Model<Role> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  value: string;
  
  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  text: string;

  @HasMany(() => User)
  users: User[];
}