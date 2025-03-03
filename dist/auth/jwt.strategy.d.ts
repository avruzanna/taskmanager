import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<User>);
    validate(payload: JwtPayload): Promise<User | null>;
}
export {};
