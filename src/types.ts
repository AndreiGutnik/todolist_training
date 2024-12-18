import { Dayjs } from 'dayjs';

export interface IToDo {
  date: Dayjs;
  content: string;
  isComplete: boolean;
}

export interface IMainForm {
  date: Dayjs;
  todo: string;
}

export interface IModal {
  currentId: string;
}
