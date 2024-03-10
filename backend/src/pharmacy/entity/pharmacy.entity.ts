import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entity/product.entity';
import { PharmacyTime } from './pharmacy-time.entity';

@Entity()
export class Pharmacy {
  @PrimaryGeneratedColumn('uuid')
  pharmacy_id: number;

  @ApiProperty({ description: '약_ID' })
  @Column()
  product_id: number;

  @ApiProperty({
    description: '약국 이름',
    example: '세화약국',
  })
  @Column({ unique: true })
  pharmacy_name: string;

  @ApiProperty({
    description: '약국 주소',
    example: '부산광역시 부산진구 대학로 3, 세화빌딩 일부 1층 (가야동)',
  })
  @Column()
  pharmacy_address: string;

  @ApiProperty({
    description: '약국 위도',
    example: '35.15448165862479',
  })
  @Column({ type: 'decimal' })
  pharmacy_lat: number;

  @ApiProperty({
    description: '약국 경도',
    example: '129.03802342799582',
  })
  @Column({ type: 'decimal' })
  pharmacy_lng: number;

  @ApiProperty({ description: '약' })
  @OneToMany(() => Product, (product) => product.pharmacy)
  @JoinColumn({ name: 'product_id' })
  product: Product[];

  @ApiProperty({ description: '약국 운영시간' })
  @OneToMany(() => PharmacyTime, (PharmacyTime) => PharmacyTime.pharmacy_id)
  PharmacyTime: PharmacyTime[];
}
