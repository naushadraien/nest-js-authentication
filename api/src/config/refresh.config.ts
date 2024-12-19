import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh-jwt', // The namespace for the configuration
  (): JwtSignOptions => ({
    //this time we are using JwtSignOptions instead of JwtModuleOptions because we are creating a refresh token and not an access token here so the options will be different
    secret: process.env.REFRESH_JWT_SECRET_KEY,
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  }),
);
