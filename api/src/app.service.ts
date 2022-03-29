import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { orderBy } from 'lodash';

import { Task, TaskStatus } from './task.entity';
import { FiltersQuery } from './filters-query.dto';

const seed: Partial<Task>[] = [
  {
    title: 'Clone your repository',
    description: `git clone <url>`,
    status: TaskStatus.DONE,
    date: new Date('2022-01-01 00:00:01').toISOString(),
  },
  {
    title: 'Install the server',
    description: `cd api;yarn install; yarn start:dev; (to start the nestjs server)`,
    status: TaskStatus.TODO,
    date: new Date('2022-01-01 00:00:02').toISOString(),
  },
  {
    title: 'Install the front',
    description: `cd web;yarn install;yarn dev; (to start the nuxtjs server)`,
    status: TaskStatus.TODO,
  },
  {
    title: 'Mock up of Task editor',
    description: `Go to this <a href="https://www.figma.com/file/Ohbo1HRfVvUzu8C2FJ62Ul/Test-UA---Dev?node-id=1225%3A31339">link</a> to see the figma`,
    status: TaskStatus.TODO,
  },
];

@Injectable()
export class AppService {
  tasks: Task[] = seed.map((s) => {
    s.id = uuid();
    s.createdAt = new Date().toISOString();
    s.updatedAt = s.createdAt;

    return s;
  }) as Task[];

  findAll(filters: FiltersQuery): Task[] {
    const _tasks = filters.status
      ? this.tasks.filter((t) => t.status === filters.status)
      : this.tasks;

    // The tasks must be listed by ascending deadline `date`, then by order of creation `createdAt` if no deadline `date`.
    // You can use external libraries to perform this.

    _tasks.sort((a: Task, b: Task) => {
      return +new Date(a.date? a.date : a.createdAt) - +new Date(b.date ? b.date : b.createdAt);
    });
    return _tasks;
  }

  findOne(id: string): Task {
    const _task = this.tasks.find((task) => task.id === id);

    if (!_task)
      throw new HttpException(
        `Unable to find task with id ${id}`,
        HttpStatus.NOT_FOUND,
      );

    return _task;
  }

  update(id: string, task: Partial<Task>): Task {
    const _tasks = this.findOne(id);

    Object.assign(_tasks, task);

    _tasks.updatedAt = new Date().toISOString();

    return _tasks;
  }

  create(task: Partial<Task>): Task {
    task.id = uuid();
    task.createdAt = new Date().toISOString();
    task.updatedAt = task.createdAt;

    this.tasks.push(task as Task);

    return task as Task;
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1)
      throw new HttpException(
        `Unable to find task with id ${id}`,
        HttpStatus.NOT_FOUND,
      );

    this.tasks.splice(taskIndex, 1);
  }
}
