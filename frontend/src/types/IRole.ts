export interface IRole<T extends string = string> {
  id: number;
  value: T;
  text: string;
}