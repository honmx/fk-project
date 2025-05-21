import { Column, DataType, Model, Table } from "sequelize-typescript";

interface NewsCreationAttrs {
  photos: string[];
  title: string;
  text: string;
}

@Table({ tableName: "news" })
export class News extends Model<News, NewsCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  photos: string[];

  @Column({ type: DataType.TEXT })
  title: string;

  @Column({ type: DataType.TEXT })
  text: string;
}