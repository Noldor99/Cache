import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Power } from 'src/entity/power.entity';
import { Repository } from 'typeorm';
import { CreatePowerDto } from './dto/create-power.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class PowerService {
  constructor(
    @InjectRepository(Power)
    private powerRepository: Repository<Power>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async addPower(dto: CreatePowerDto): Promise<Power> {
    const { power } = dto;
    const addPower = this.powerRepository.create({
      power,
    });

    await this.powerRepository.save(addPower);
    return addPower;
  }

  async removePower(id: number): Promise<string> {
    await this.powerRepository.delete(id);
    return 'Power deleted';
  }

  async getById(id: number): Promise<Power> {
    const cacheKey = `power_${id}`;
    const cachedPower = await this.cacheManager.get<Power>(cacheKey);

    console.log('simple');
    if (cachedPower) {
      return cachedPower;
    }

    const power = await this.powerRepository.findOne({ where: { id } });

    if (!power) {
      throw new NotFoundException(`Power with id ${id} not found`);
    }

    await this.cacheManager.set(cacheKey, power);

    const store = this.cacheManager.store;
    const allCacheKeys = await store.keys();

    console.log('All Cache Keys:', allCacheKeys);

    return power;
  }
}
