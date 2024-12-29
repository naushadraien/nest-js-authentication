import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Use the Reflector to get the metadata value for the IS_PUBLIC_KEY
    // The Reflector helps to retrieve metadata set by decorators
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // Check if the handler (method) has the IS_PUBLIC_KEY metadata
      context.getClass(), // Check if the class (controller) has the IS_PUBLIC_KEY metadata
    ]);

    // If the route is public, allow access without authentication
    if (isPublic) {
      return true;
    }

    // Otherwise, use the default JWT authentication guard
    return super.canActivate(context);
  }
}
