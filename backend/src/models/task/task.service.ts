import { TASK_NOT_FOUND } from '@app/common/constants/exceptions';
import { PrismaService } from '@app/providers/database/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: string) {
    const task = this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto, authorId: string) {
    return this.prisma.task.create({
      data: { ...createTaskDto, authorId },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    return task;
  }

  delete(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}
