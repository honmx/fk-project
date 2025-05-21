import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Group } from "apps/groups/src/models/group.model";

@Table({ tableName: "userGroups", createdAt: false, updatedAt: false })
export class UserGroups extends Model<UserGroups> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.NUMBER })
  userId: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.NUMBER })
  groupId: number;
}