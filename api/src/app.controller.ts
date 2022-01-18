import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { AppService } from './app.service';
import { CreateDto } from './create.dto';
import { FiltersQuery } from './filters-query.dto';
import { Task } from './task.entity';
import { UpdateDto } from './update.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findlAll(@Query() filters: FiltersQuery): Task[] {
    return this.appService.findAll(filters);
  }

  @Get(':taskId')
  get(@Param('taskId') id: string): Task {
    return this.appService.findOne(id);
  }

  @Patch(':taskId')
  update(@Param('taskId') id: string, @Body() task: UpdateDto): Task {
    return this.appService.update(id, task);
  }

  @Post()
  create(@Body() task: CreateDto): Task {
    return this.appService.create(task);
  }

  @Delete(':taskId')
  @HttpCode(204)
  remove(@Param('taskId') id: string) {
    return this.appService.remove(id);
  }
}
