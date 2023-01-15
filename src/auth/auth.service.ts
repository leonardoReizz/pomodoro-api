import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import md5 from 'md5';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.login({
      email,
      password: md5(password),
    });

    if (user.length > 0) {
      const token = await this.generateToken(user[0]);
      return { message: { ...user[0], ...token } };
    }
    throw new UnauthorizedException('Invalid Email or Password');
  }

  async generateToken(payload: User) {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email },
        {
          secret: 'topSecret512',
          expiresIn: '1h',
        },
      ),
    };
  }
}
