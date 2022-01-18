import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './task.entity';

export class UpdateDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsDateString()
  date: string;
}
