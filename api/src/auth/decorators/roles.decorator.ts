// Import the necessary module from NestJS core
import { SetMetadata, BadRequestException } from '@nestjs/common';
import { Role } from '@prisma/client';

/**
 * Roles decorator to set metadata for roles on route handlers.
 * This decorator can be used to specify which roles are allowed to access a particular route.
 *
 * Usage:
 * @Roles('admin', 'user')
 * @Controller('example')
 * export class ExampleController {
 *   @Get()
 *   findAll() {
 *     // ...
 *   }
 * }
 */

// Define a constant for the roles metadata key
export const ROLES_KEY = 'roles';

/**
 * Roles decorator function.
 *
 * @param roles - An array of roles that are allowed to access the route.
 * The spread operator (...) is used to allow passing multiple roles as separate arguments.
 * The tuple type [Role, ...Role[]] ensures that at least one role is provided.
 *
 * Example:
 * @Roles('admin', 'user')
 *
 * The spread operator collects the arguments into an array: ['admin', 'user']
 */
export const Roles = (...roles: [Role, ...Role[]]) => {
  // Validate that roles are not empty
  if (roles.length === 0) {
    throw new BadRequestException('Roles cannot be empty');
  }
  return SetMetadata(ROLES_KEY, roles);
};
