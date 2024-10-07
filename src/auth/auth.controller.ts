import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Token } from 'src/decorators/token-decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: 3600000,
      sameSite: 'lax',
      secure: false,
    });

    return res.redirect('http://localhost:3001/home');
  }

  @Get('validate-token')
  async validateToken(
    @Token('access_token') token: string,
    @Res() res: Response,
  ) {
    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const decoded = await this.authService.validateJwt(token);
      return res.status(200).json({ valid: true, decoded });
    } catch (error) {
      return res.status(401).json({ valid: false, message: error.message });
    }
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.redirect('/');
  }
}
