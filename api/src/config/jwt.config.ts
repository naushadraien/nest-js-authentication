import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

/**
 * The `registerAs` function is used to register a configuration namespace in the NestJS configuration system.
 * This allows you to organize and access configuration settings in a structured way.
 *
 * @param namespace - The name of the configuration namespace. In this case, it is 'jwt'.
 * @param configFactory - A function that returns the configuration object. This function can access environment variables and other configuration sources.
 *
 * The configuration object returned by the configFactory function should match the expected structure of the JwtModuleOptions.
 */
export default registerAs(
  'jwt', // The namespace for the configuration
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET_KEY, // The secret key used to sign JWT tokens
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN, // The expiration time for JWT tokens
    },
  }),
);
