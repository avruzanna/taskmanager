import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
