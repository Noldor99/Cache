import { CacheModule, Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerController } from './power.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Power } from 'src/entity/power.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Power]), CacheModule.register({})],
  controllers: [PowerController],
  providers: [PowerService],
})
export class PowerModule {}
