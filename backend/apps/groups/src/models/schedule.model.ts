import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "apps/users/src/models/user.model";
import { TrainingByDay } from "./trainingByDay.model";
import { TrainingByDayOfTheWeek } from "./trainingByDayOfTheWeek.model";
import { Group } from "./group.model";

interface ScheduleCreationAttrs {
  date: string;
}

@Table({ tableName: "schedule" })
export class Schedule extends Model<Schedule, ScheduleCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TEXT })
  date: string;

  @ForeignKey(() => TrainingByDay)
  @Column({ type: DataType.INTEGER, allowNull: true })
  trainingsByDayId: number;

  @HasMany(() => TrainingByDay)
  trainingsByDay: TrainingByDay[];

  @ForeignKey(() => TrainingByDayOfTheWeek)
  @Column({ type: DataType.INTEGER, allowNull: true })
  trainingsByDayOfTheWeekId: number;

  @HasMany(() => TrainingByDayOfTheWeek)
  trainingsByDayOfTheWeek: TrainingByDayOfTheWeek[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  userId: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: true })
  groupId: number;
}