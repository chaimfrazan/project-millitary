import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shift } from './entities/shift.entity';

@Module({
  imports: [SequelizeModule.forFeature([Shift])],
  controllers: [ShiftsController],
  providers: [ShiftsService],
})
export class ShiftsModule {}
