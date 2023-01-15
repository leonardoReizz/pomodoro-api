import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(user: Pick<IUser, 'email' | 'password'>): Promise<User[]> {
    const login = await this.userRepository.find({
      where: {
        email: user.email,
        password: user.password,
      },
    });

    delete login[0]?.password;
    return login;
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
