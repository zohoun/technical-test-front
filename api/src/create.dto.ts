import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './task.entity';

export class CreateDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  date: string;
}
