import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Weekday } from '../enum/weekday.enum';
import { Pharmacy } from './pharmacy.entity';

@Entity()
export class PharmacyTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pharmacy_id: number;

  @Column()
  day: Weekday;

  @Column()
  openTIme: string;

  @Column()
  closeTime: string;

  @Column()
  open24: boolean;

  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.PharmacyTime)
  pharmacy: Pharmacy;
}
