export class CreateCoachDto {
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