import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from './task.entity';

export class FiltersQuery {
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}
