import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { IPlace } from "../types/IPlace";
import { Place } from "apps/places/src/models/place.model";
import { Schedule } from "./schedule.model";
import { PersonTraining } from "./personTraining.model";

interface TrainingByDayCreationAttrs {
  date: string;
  time: string;
}

@Table({ tableName: "trainingsByDay" })
export class TrainingByDay extends Model<TrainingByDay, TrainingByDayCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TEXT })
  date: string;

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

  @ForeignKey(() => PersonTraining)
  @Column({ type: DataType.INTEGER, allowNull: true })
  personTrainingsId: number;

  // @HasMany(() => PersonTraining)
  // personTrainings: PersonTraining[];
}