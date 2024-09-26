import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanionDto } from './create-companion.dto';

export class UpdateCompanionDto extends PartialType(CreateCompanionDto) {}
