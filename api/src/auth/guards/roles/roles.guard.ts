import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the roles metadata set by the Roles decorator
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      //if the endpoint is not set using @Roles() metadata then allow the user to access the route
      return true; // If no roles are defined, allow access
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = roles.some((role) => role === user.role);
    return hasRole;
  }
}
