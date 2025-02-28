import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { instanceToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword, name });
    await this.userRepository.save(user);
    const plainUser = instanceToPlain(user);
    return plainToClass(User, plainUser);

  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
