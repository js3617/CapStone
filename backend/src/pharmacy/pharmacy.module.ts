import { Module } from '@nestjs/common';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';

@Module({
  controllers: [PharmacyController],
  providers: [PharmacyService]
})
export class PharmacyModule {}
