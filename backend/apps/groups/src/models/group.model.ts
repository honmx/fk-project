import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "apps/users/src/models/user.model";
import { Schedule } from "./schedule.model";
import { UserGroups } from "apps/users/src/models/userGroups.model";

interface GroupCreationAttrs {
  name: string;
}

@Table({ tableName: "groups" })
export class Group extends Model<Group, GroupCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TEXT, unique: true })
  name: string;
  
  @Column({ type: DataType.INTEGER })
  amountOfTrainingsInSubscription: number;

  @BelongsToMany(() => User, () => UserGroups)
  participants: User[];

  @ForeignKey(() => Schedule)
  @Column({ type: DataType.INTEGER, allowNull: true })
  scheduleId: number;

  @HasMany(() => Schedule)
  schedule: Schedule[];
}