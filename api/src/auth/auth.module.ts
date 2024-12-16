import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // Register the JWT module asynchronously using the configuration provider created by jwtConfig.asProvider()
    // This allows the JwtModule to access the configuration values defined in jwt.config.ts
    JwtModule.registerAsync(jwtConfig.asProvider()),

    // Load the JWT configuration and make it available to the ConfigService under the 'jwt' namespace
    // This allows other parts of the application to access the JWT configuration values using the ConfigService
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
