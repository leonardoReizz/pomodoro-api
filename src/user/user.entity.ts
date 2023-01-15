import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column('text')
  firstName: string;

  @IsNotEmpty()
  @Column('text')
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Column('text')
  email: string;

  @IsNotEmpty()
  @Column('text')
  password: string;
}
