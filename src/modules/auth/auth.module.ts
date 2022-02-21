import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountRepository } from '@modules/account/repositories/account.repository';
import { AuthSignUpService } from './services/sign-up-auth.service';
import { AuthSignInService } from './services/sign-in-auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  providers: [JwtStrategy, AuthSignUpService, AuthSignInService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
