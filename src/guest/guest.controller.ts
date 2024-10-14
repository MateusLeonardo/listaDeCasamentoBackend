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
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Guest } from 'src/decorators/guest-decorator';
import { User } from 'src/decorators/user-decorator';

@UseGuards(JwtAuthGuard)
@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post()
  async create(@User() user, @Body() createGuestDto: CreateGuestDto) {
    return this.guestService.create(user, createGuestDto);
  }

  @Get()
  async findAll() {
    return this.guestService.findAll();
  }

  @Get('profile')
  async getProfile(@Guest() guestId) {
    return this.guestService.getProfile(guestId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.guestService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGuestDto: UpdateGuestDto,
  ) {
    return this.guestService.update(id, updateGuestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.guestService.remove(id);
  }
}
