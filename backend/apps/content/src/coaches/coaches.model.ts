import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CoachCreationAttrs {
  photo?: string;
  type: "Тренер" | "Главный тренер" | "Руководитель";
  name: string;
  birth: string;
  education?: string[];
  startedPlaying: number;
  firstCoachName: string;
  currentTeam?: string;
  teams?: string[];
  achievements?: string[];
}

@Table({ tableName: "coaches" })
export class Coach extends Model<Coach, CoachCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  
  @Column({ type: DataType.TEXT, allowNull: true, defaultValue: null })
  photo: string;
  
  @Column({ type: DataType.TEXT })
  type: "Тренер" | "Главный тренер" | "Руководитель";
  
  @Column({ type: DataType.TEXT })
  name: string;
  
  @Column({ type: DataType.TEXT })
  birth: string;
  
  @Column({ type: DataType.ARRAY(DataType.TEXT), defaultValue: [] })
  education: string[];
  
  @Column({ type: DataType.INTEGER })
  startedPlaying: number;
  
  @Column({ type: DataType.TEXT })
  firstCoachName: string;

  @Column({ type: DataType.TEXT, allowNull: true, defaultValue: null })
  currentTeam: string;
  
  @Column({ type: DataType.ARRAY(DataType.TEXT), defaultValue: [] })
  teams: string[];
  
  @Column({ type: DataType.ARRAY(DataType.TEXT), defaultValue: [] })
  achievements: string[];
}