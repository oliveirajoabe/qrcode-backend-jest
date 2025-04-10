import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { UrlModule } from 'src/url/url.module';

@Module({
  imports: [AuthModule, UsersModule, UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
