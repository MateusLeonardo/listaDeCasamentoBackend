import { IsBoolean, IsString } from 'class-validator';

export class CreateGuestDto {
  @IsString()
  telefone: string;

  @IsBoolean()
  isConfirmed: boolean;
}
