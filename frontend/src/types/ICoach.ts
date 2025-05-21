export interface ICoach {
  id: number;
  type: "Тренер" | "Главный тренер" | "Руководитель";
  photo?: string;
  name: string;
  birth: string;
  startedPlaying: number;
  firstCoachName: string;
  currentTeam?: string;
  education: string[];
  teams: string[];
  achievements: string[];
}