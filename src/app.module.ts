import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { HistoryModule } from './history/history.module';
import { History } from './history/history.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, History],
      synchronize: true,
      migrations: [__dirname + './database/migrations/*{.ts,.js}'],
    }),
    UserModule,
    HistoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
