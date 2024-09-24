import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanionsModule } from 'src/companions/companions.module';

@Module({
  imports: [PrismaModule, CompanionsModule],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
