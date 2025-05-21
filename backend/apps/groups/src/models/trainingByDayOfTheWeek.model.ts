import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { IPlace } from "../types/IPlace";
import { Place } from "apps/places/src/models/place.model";
import { Schedule } from "./schedule.model";

interface TrainingByDayOfTheWeekCreationAttrs {
  dayOfTheWeek: number;
  time: string;
}

@Table({ tableName: "trainingsByDayOfTheWeek" })
export class TrainingByDayOfTheWeek extends Model<TrainingByDayOfTheWeek, TrainingByDayOfTheWeekCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER })
  dayOfTheWeek: number;
  
  @Column({ type: DataType.TEXT })
  time: string;

  @ForeignKey(() => Place)
  @Column({ type: DataType.INTEGER, allowNull: true })
  placeId: number;

  @BelongsTo(() => Place)
  place: Place;

  @ForeignKey(() => Schedule)
  @Column({ type: DataType.INTEGER, allowNull: true })
  scheduleId: number;
}