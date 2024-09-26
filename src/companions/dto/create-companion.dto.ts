import { IsBoolean, IsString } from 'class-validator';

export class CreateCompanionDto {
  @IsString()
  name: string;

  @IsBoolean()
  isConfirmed: boolean;
}
