import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiPropertyOptional,
  ApiProperty,
  ApiHeader,
} from '@nestjs/swagger';
import { AuthDTO } from './middleware/auth-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp New User'})
  @Post('/signup')
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: AuthDTO })
  signUp(@Body(ValidationPipe) authDTO: AuthDTO): Promise<string> {
    return this.authService.signUp(authDTO);
  }

  @ApiOperation({ summary: 'User Login and get token'})
  @ApiOkResponse({ description: 'success' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: AuthDTO })
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authDTO: AuthDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authDTO);
  }
}
