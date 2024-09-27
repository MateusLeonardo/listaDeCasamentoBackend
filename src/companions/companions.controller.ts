import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompanionsService } from './companions.service';
import { CreateCompanionDto } from './dto/create-companion.dto';
import { UpdateCompanionDto } from './dto/update-companion.dto';
import { ParamId } from 'src/decorators/param-decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('guest/:id/companions')
export class CompanionsController {
  constructor(private readonly companionsService: CompanionsService) {}

  @Post()
  create(
    @ParamId() guestId: string,
    @Body() createCompanionDto: CreateCompanionDto,
  ) {
    return this.companionsService.create(guestId, createCompanionDto);
  }

  @Get()
  findAll(@ParamId() id: string) {
    return this.companionsService.findAll();
  }

  @Get(':id')
  findOne(@ParamId() id: string) {
    return this.companionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @ParamId() id: string,
    @Body() updateCompanionDto: UpdateCompanionDto,
  ) {
    return this.companionsService.update(id, updateCompanionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companionsService.remove(+id);
  }
}
