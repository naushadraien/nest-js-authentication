import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthJWTPayload } from './types/auth.jwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(createUserDto: CreateUserDto) {
    const existedUser = await this.userService.findByEmail(createUserDto.email);
    if (existedUser) throw new ConflictException('User already exists!');
    return this.userService.create(createUserDto);
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid Credentials!');
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid Credentials!');

    return { id: user.id, name: user.name };
  }
  async login(userId: number, name?: string) {
    const { accessToken } = await this.generateTokens(userId);
    return {
      id: userId,
      name,
      accessToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: AuthJWTPayload = { sub: userId };
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload),
    ]);
    return {
      accessToken,
    };
  }
}
