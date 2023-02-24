import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { ProjectStatus } from '../project.controller';

enum ProjectStatusEnum {
  planned = 'planned',
  inprogress = 'inprogress',
  finished = 'finished',
  frogged = 'frogged',
}

export class CreateProjectDto {
  @ApiProperty({
    type: String,
    example: 'My Awesome Project',
    description:
      'Required property with a mximum length of 100 characters. Name of the project.',
  })
  @Length(1, 100, {
    message: 'Name must be between 1 and 100 characters.',
  })
  name: string;

  @ApiPropertyOptional({
    type: String,
    example: 'US 7',
    description:
      'Optional property with a maximum length of 10 characters. Needle size of the project.',
  })
  @MaxLength(10, {
    message: 'Needle size must be 10 characters or less.',
  })
  @IsOptional()
  needleSize?: string;

  @ApiPropertyOptional({
    type: String,
    example: '12',
    description:
      'Optional property with a maximum length of 10 characters. Gauge of the project.',
  })
  @MaxLength(10, {
    message: 'Gauge must be 10 characters or less.',
  })
  @IsOptional()
  gauge?: string;

  @ApiPropertyOptional({
    type: String,
    example: '2023-02-23T22:36:31.436Z',
    description:
      'Optional property with a format of an ISO 8601 date. This date represents when the project was started.',
  })
  @IsDateString(
    {},
    {
      message:
        'Date started must be a valid ISO 8601 date (e.g., 2023-02-23T22:36:31.436Z)',
    },
  )
  @IsOptional()
  dateStarted?: string;

  @ApiPropertyOptional({
    type: String,
    example: '2023-02-23T22:36:31.436Z',
    description:
      'Optional property with a format of an ISO 8601 date. This date represents when the project was finished.',
  })
  @IsDateString(
    {},
    {
      message:
        'Date finished must be a valid ISO 8601 date (e.g., 2023-02-23T22:36:31.436Z)',
    },
  )
  @IsOptional()
  dateFinished?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'This project is my first project. Lets see how this goes.',
    description:
      'Optional property with a maximum length of 1000 characters. This is whatever you want to say about the project.',
  })
  @MaxLength(1000, {
    message: 'Notes must be 1000 characters or less',
  })
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'inprogress',
    enum: ['planned', 'inprogress', 'finished', 'frogged'],
    description: 'Optional property that describes the status of the project.',
  })
  @IsEnum(ProjectStatusEnum, {
    message:
      "Status must be one of the following: 'planned', 'inprogress', 'finished', 'frogged'",
  })
  @IsOptional()
  status?: ProjectStatus;
}
