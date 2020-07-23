import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiBody, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthDTO } from './middleware/auth-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from './middleware/jwt-auth.guard';
import { Customer } from 'src/customer/customer.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @ApiCreatedResponse({ description: 'User Registration' })
    @ApiBody({ type: AuthDTO })
    signUp(@Body(ValidationPipe) authDTO: AuthDTO): Promise<string> {
        return this.authService.signUp(authDTO);
    }

    @Post('/signin')
    @ApiOkResponse({ description: 'User Login' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBody({ type: AuthDTO })
    signIn(@Body(ValidationPipe) authDTO: AuthDTO): Promise<{ accessToken: string }> {
        return this.authService.signIn(authDTO);
    }

    @Post('/test')
    @UseGuards(JwtAuthGuard)  //error challenge cannot undefine when use AuthGuard()
    test(@GetUser() user: Customer) {
        console.log('Test User:', user);
    }
}
