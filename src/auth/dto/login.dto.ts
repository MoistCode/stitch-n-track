import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: 'awesomeusername',
    description: 'Required property with a maximum length of 25 characters.',
  })
  @IsEmail({}, { message: 'Email must be valid.' })
  email: string;

  @ApiProperty({
    type: String,
    example: 'SuPerAweSomEP@ssW0rd!',
    description:
      'Required property with a minimum length of 12 characters and a maximum length of 100 characters. Must have one uppercase letter, one lowercase letter, and one number or special character.',
  })
  @Length(12, 100, {
    message: 'Password must be between 12 and 100 characters.',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must have one uppercase letter, one lowercase letter, and one number or special character.',
  })
  password: string;
}
