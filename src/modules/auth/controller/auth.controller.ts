import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { AuthSignInService } from '../services/sign-in-auth.service';

@Controller('/')
export class AuthController {
  constructor(private authSignInService: AuthSignInService) {}

  @Post('login')
  signIn(@Body() authCredentials: AuthCredentialsDto): Promise<any> {
    return this.authSignInService.signIn(authCredentials);
  }
}
