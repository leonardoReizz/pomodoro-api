import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class History {
  @Column()
  @PrimaryColumn()
  id: string;

  @Column('int')
  userId: number;

  @Column('int')
  minutesAmount: number;

  @IsNotEmpty()
  @Column()
  startDate: string;

  @Column()
  interruptedDate: string;
  @Column()
  finishedDate?: string;

  @IsNotEmpty()
  @Column('text')
  type: string;
}
