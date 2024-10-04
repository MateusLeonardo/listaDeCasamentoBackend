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
  create(@User() user, @Body() createGuestDto: CreateGuestDto) {
    return this.guestService.create(user, createGuestDto);
  }

  @Get()
  findAll() {
    return this.guestService.findAll();
  }

  @Get('profile')
  getProfile(@Guest() guestId) {
    return this.guestService.getProfile(guestId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestDto: UpdateGuestDto) {
    return this.guestService.update(id, updateGuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestService.remove(id);
  }
}
