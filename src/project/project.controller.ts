import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { CreateProjectDto } from './dto';
import { ProjectService } from './project.service';
import { Project } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtRequestPayload } from 'src/auth/types/auth';

// Frogged is synonymous with abandoned. This is because unraveling a project is
// makes a ribbiting sound.
const projectStatusList = Object.freeze([
  'planned',
  'inprogress',
  'finished',
  'frogged',
] as const);

export type ProjectStatus = (typeof projectStatusList)[number];

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Version('1')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project | null> {
    let project;

    try {
      project = this.projectService.findOne({ id });
    } catch (err) {
      console.error(err);
    }

    if (!project) {
      throw new NotFoundException({ error: 'Project not found.' });
    }

    return project;
  }

  @UseGuards(JwtAuthGuard)
  @Version('1')
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req: { user: JwtRequestPayload },
  ): Promise<Project> {
    const { userId } = req.user;

    const createData = {
      ...createProjectDto,
      authorId: userId,
      status: projectStatusList.findIndex(
        (status) => status === createProjectDto.status,
      ),
    };

    let project;

    try {
      project = this.projectService.create(createData);
    } catch (err) {
      console.error(err);
    }

    if (!project) {
      throw new BadRequestException({ error: 'Unable to create project.' });
    }

    return project;
  }
}
