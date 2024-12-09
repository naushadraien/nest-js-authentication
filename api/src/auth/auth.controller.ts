import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const existedUser = await this.userService.findByEmail(createUserDto.email);
    if (existedUser) throw new ConflictException('User already exists!');
    return this.userService.create(createUserDto);
  }
}
