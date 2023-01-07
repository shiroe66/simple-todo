import { GetUser } from '@app/common/decorators/request';
import { AuthenticatedGuard } from '@app/common/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthenticatedGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@GetUser('id') id: string) {
    return this.taskService.findAll(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.findOne(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @GetUser('id') user: string,
  ) {
    return this.taskService.create(createTaskDto, user);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.delete(id);
  }
}
