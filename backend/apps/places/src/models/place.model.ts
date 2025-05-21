import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface PlaceCreationAttrs {
  name: string;
  photo: string;
}

@Table({ tableName: "places" })
export class Place extends Model<Place, PlaceCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.TEXT })
  name: string;

  @Column({ type: DataType.TEXT })
  photo: string;
}