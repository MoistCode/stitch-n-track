import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project, Prisma } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: projectWhereUniqueInput,
    });
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({ data });
  }
}
