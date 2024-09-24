import { IsBoolean, IsMobilePhone, IsString } from 'class-validator';

export class CreateGuestDto {
  @IsMobilePhone('pt-BR')
  @IsString()
  telefone: string;

  @IsBoolean()
  isConfirmed: boolean;
}
