import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { TrainingByDay } from "./trainingByDay.model";
import { User } from "apps/users/src/models/user.model";

interface PersonTrainingCreationAttrs {
  attendance: "П" | "УП" | "НП" | "Б"
}

@Table({ tableName: "personTrainings" })
export class PersonTraining extends Model<PersonTraining, PersonTrainingCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  attendance: "П" | "УП" | "НП" | "Б";

  @ForeignKey(() => TrainingByDay)
  @Column({ type: DataType.INTEGER, allowNull: true })
  trainingByDayId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  userId: number;

  @BelongsTo(() => TrainingByDay)
  training: TrainingByDay;
}