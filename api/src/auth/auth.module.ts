import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';
import refreshConfig from 'src/config/refresh.config';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import googleOauthConfig from 'src/config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';
import frontendConfig from 'src/config/frontend.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';

@Module({
  imports: [
    // Register the JWT module asynchronously using the configuration provider created by jwtConfig.asProvider()
    // This allows the JwtModule to access the configuration values defined in jwt.config.ts
    JwtModule.registerAsync(jwtConfig.asProvider()),

    // Load the JWT configuration and make it available to the ConfigService under the 'jwt' namespace
    // This allows other parts of the application to access the JWT configuration values using the ConfigService
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
    ConfigModule.forFeature(googleOauthConfig),
    ConfigModule.forFeature(frontendConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
    {
      provide: APP_GUARD, // this is used to protect routes using the JwtAuthGuard globally and we don't have to use the @UseGuards() decorator in each route
      useClass: JwtAuthGuard, //@UseGuards(JwtAuthGuard) // only signed in user can call any route
    },
    // {
    //   provide: APP_GUARD, // this is used to protect routes using the RolesGuard globally and we don't have to use the @UseGuards() decorator in each route
    //   useClass: RolesGuard, //@UseGuards(RolesGuard)
    // }, //this role guard is only applied to the endpoint whose metadata is set using @Roles() decorator but not applied to other end-points as set in the roles.guard.ts file
  ],
})
export class AuthModule {}
