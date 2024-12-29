import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthJWTPayload } from './types/auth.jwtPayload';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import refreshConfig from 'src/config/refresh.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,

    @Inject(refreshConfig.KEY) // Inject the refresh token configuration using the ConfigService
    private refreshTokenConfiguration: ConfigType<typeof refreshConfig>,
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
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10); //this is done for invalidating or revoking the refresh token when the user logs out
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      name,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: AuthJWTPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfiguration),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findUserById(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    return { id: user.id };
  }
  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findUserById(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    const isRefreshTokenMatched = await bcrypt.compare(
      //this is for invalidating or revoking the refresh token when the user logs out
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!isRefreshTokenMatched)
      throw new UnauthorizedException('Invalid refresh token');
    return { id: user.id, name: user.name };
  }

  async getMyProfile(userId: number) {
    return await this.userService.findUserById(userId);
  }

  async refresh(userId: number, name: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10); //this is done for invalidating or revoking the refresh token when the user logs out to prevent the user from using the old refresh token to get a new access token
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      name,
      accessToken,
      refreshToken,
    };
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;
    return await this.userService.create(googleUser);
  }

  async logOut(userId: number) {
    return await this.userService.updateHashedRefreshToken(userId, null); //this is done for invalidating or revoking the refresh token when the user logs out to prevent the user from using the old refresh token to get a new access token
  }
}
