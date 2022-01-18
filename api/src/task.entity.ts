export enum TaskStatus {
  TODO = 'TODO',
  DONE = 'DONE',
}

export class Task {
  id: string;
  date?: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}
