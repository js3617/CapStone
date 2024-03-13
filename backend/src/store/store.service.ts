import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entity/store.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async importStores(): Promise<void> {
    const filePath = path.join(__dirname, './data/store.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const stores = JSON.parse(fileContent);

    for (const key in stores) {
      if (stores.hasOwnProperty(key)) {
        const store = stores[key];
        await this.storeRepository.save({
          store_name: store['편의점명'],
          store_address: store['주소'],
          store_lat: parseFloat(store['위도']),
          store_lng: parseFloat(store['경도']),
        });
      }
    }
  }
}
