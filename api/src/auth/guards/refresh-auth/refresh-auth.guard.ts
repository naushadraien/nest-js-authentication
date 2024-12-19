import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//this file is created using the command: nest g gu auth/guards/refresh-auth
@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh-jwt') {}
