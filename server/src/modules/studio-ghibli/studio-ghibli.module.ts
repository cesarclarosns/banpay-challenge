import { Module } from '@nestjs/common';

import { StudioGhibliController } from './studio-ghibli.controller';
import { StudioGhibliService } from './studio-ghibli.service';

@Module({
  controllers: [StudioGhibliController],
  providers: [StudioGhibliService],
})
export class StudioGhibliModule {}
