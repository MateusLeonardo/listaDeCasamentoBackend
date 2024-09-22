import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService, // Injetando o ConfigService diretamente
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    let authProvider = await this.prisma.authProvider.findFirst({
      where: {
        provider: 'google',
        providerId: id,
      },
      include: {
        user: true,
      },
    });

    if (!authProvider) {
      const newUser = await this.prisma.user.create({
        data: {
          name: `${name.givenName} ${name.familyName || ''}`.trim(),
          email: emails[0].value,
          picture: photos[0].value,
          providers: {
            create: {
              provider: 'google',
              providerId: id,
            },
          },
        },
        include: {
          providers: true,
        },
      });

      authProvider = {
        id: newUser.providers[0].id,
        provider: newUser.providers[0].provider,
        providerId: newUser.providers[0].providerId,
        userId: newUser.id,
        user: newUser,
      };
    }

    done(null, authProvider.user);
  }
}
