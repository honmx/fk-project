import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Role } from "./role.model";
import { Group } from "apps/groups/src/models/group.model";
import { PersonTraining } from "apps/groups/src/models/personTraining.model";
import { MedicalDocument } from "./medicalDocument.model";
import { Insurance } from "./insurance.model";
import { UserGroups } from "./userGroups.model";

interface UserCreationAttrs {
  type: "user" | "coach";
  email: string;
  password: string;
  photo: string | null;
  name: string;
  parentName: string | null;
  birth: string | null;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TEXT })
  type: string;

  @Column({ type: DataType.TEXT, unique: true })
  email: string;

  @Column({ type: DataType.TEXT })
  password: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  photo: string;

  @Column({ type: DataType.TEXT })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  parentName: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  birth: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  trainingsLeft: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: true })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @BelongsToMany(() => Group, () => UserGroups)
  groups: Group[];

  @HasMany(() => PersonTraining)
  history: PersonTraining[];

  @HasOne(() => MedicalDocument)
  medicalDocument: MedicalDocument

  @HasOne(() => Insurance)
  insurance: Insurance
  user: any;
}