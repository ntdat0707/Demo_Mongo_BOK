import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './middleware/auth-dto';
import { JwtPayload } from './middleware/jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authDTO: AuthDTO): Promise<string> {
    return this.userRepository.signUp(authDTO);
  }

  async signIn(authDTO: AuthDTO): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validatePassword(authDTO);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { user };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );
  
    return { accessToken };
  }

  async getUser(auth: AuthDTO): Promise<User> {
    return this.userRepository.getUser(auth);
  }


}
