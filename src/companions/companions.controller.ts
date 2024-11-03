import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompanionsService } from './companions.service';
import { CreateCompanionDto } from './dto/create-companion.dto';
import { UpdateCompanionDto } from './dto/update-companion.dto';
import { ParamId } from 'src/decorators/param-decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user-decorator';

@UseGuards(JwtAuthGuard)
@Controller('guest/:guestId/companion')
export class CompanionsController {
  constructor(private readonly companionsService: CompanionsService) {}

  @Post()
  async create(@User() user, @Body() createCompanionDto: CreateCompanionDto[]) {
    const results = await Promise.all(
      createCompanionDto.map((companion) =>
        this.companionsService.create(user.guestId, companion),
      ),
    );

    return { success: true, results };
  }

  @Get()
  async findAll() {
    return this.companionsService.findAll();
  }

  @Get(':id')
  async findOne(@ParamId() id: string) {
    return this.companionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @ParamId() id: string,
    @Body() updateCompanionDto: UpdateCompanionDto,
  ) {
    return this.companionsService.update(id, updateCompanionDto);
  }

  @Delete(':id')
  async remove(@ParamId() id: string) {
    return this.companionsService.remove(id);
  }
}
