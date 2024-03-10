import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from '../../store/entity/store.entity';
import { Pharmacy } from '../../pharmacy/entity/pharmacy.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: number;

  @ApiProperty({ description: '편의점_ID' })
  @Column()
  store_id: number;

  @ApiProperty({ description: '약국_ID' })
  @Column()
  pharmacy_id: number;

  @ApiProperty({
    description: '약 이름',
    example: '타이레놀정 500mg',
  })
  @Column({ unique: true })
  product_name: string;

  @ApiProperty({
    description: '설명',
    example: '이 약은 해열진통제입니다.',
  })
  @Column()
  product_description: string;

  @ApiProperty({
    description: '복약 방법',
    example:
      '4~6시간 간격을 두고 복용하며, 일일 최대용량 4g(8정)을 초과하여 복용하지 않습니다.',
  })
  @Column()
  product_taking: string;

  @ApiProperty({
    description: '분류',
    example: '해열, 진통, 소염제',
  })
  @Column()
  product_classify: string;

  @ApiProperty({
    description: '주의사항',
    example:
      '매일 세잔 이상 정기적으로 술을 마시는 사람이 이 약이나 다른 해열 진통제를 복용해야 할 경우 반드시 의사 또는 약사와 상의해야 한다. 이러한 사람이 이 약을 복용하면 간손상이 유발될 수 있다.',
  })
  product_cautions: string;

  @ApiProperty({ description: '편의점 ID' })
  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store[];

  @ApiProperty({ description: '약국 ID' })
  @ManyToOne(() => Pharmacy)
  @JoinColumn({ name: 'pharmacy_id' })
  pharmacy: Pharmacy[];
}
