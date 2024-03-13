import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entity/product.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  store_id: number;

  @ApiProperty({ description: '약_ID' })
  @Column()
  product_id: number;

  @ApiProperty({ description: '편의점 이름', example: '씨유 동의대공원점' })
  @Column()
  store_name: string;

  @ApiProperty({
    description: '편의점 주소',
    example: '부산광역시 부산진구 가야동 454번지 48호',
  })
  @Column()
  store_address: string;

  @ApiProperty({
    description: '편의점 위도',
    example: '35.1493964',
  })
  @Column({ type: 'float' })
  store_lat: number;

  @ApiProperty({
    description: '편의점 경도',
    example: '129.0349086',
  })
  @Column({ type: 'float' })
  store_lng: number;

  @ApiProperty({ description: '약' })
  @OneToMany(() => Product, (product) => product.store)
  @JoinColumn({ name: 'product_id' })
  product: Product[];
}
