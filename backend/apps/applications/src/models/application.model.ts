import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ApplicationCreationAttrs {
  childName: string;
  parentName: string;
  dateOfBirth: string;
  phone: string;
  branch: string;
  timeFrom: string;
  timeTo: string;
  status: "Новый" | "Просмотрено" | "Завершено";
}

@Table({ tableName: "applications" })
export class Application extends Model<Application, ApplicationCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TEXT })
  status: "Новый" | "Просмотрено" | "Завершено";

  @Column({ type: DataType.TEXT })
  childName: string;

  @Column({ type: DataType.TEXT })
  parentName: string;

  @Column({ type: DataType.TEXT })
  dateOfBirth: string;

  @Column({ type: DataType.TEXT })
  phone: string;

  @Column({ type: DataType.TEXT })
  branch: string;

  @Column({ type: DataType.TEXT })
  timeFrom: string;

  @Column({ type: DataType.TEXT })
  timeTo: string;
}