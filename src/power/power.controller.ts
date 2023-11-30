import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  CacheKey,
  CacheTTL,
} from '@nestjs/common';
import { PowerService } from './power.service';
import { CreatePowerDto } from './dto/create-power.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('power')
@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Post()
  create(@Body() createPowerDto: CreatePowerDto) {
    return this.powerService.addPower(createPowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.powerService.removePower(+id);
  }

  @Get(':id')
  @CacheKey('some_route')
  @CacheTTL(5)
  getById(@Param('id') id: string) {
    return this.powerService.getById(+id);
  }
}
