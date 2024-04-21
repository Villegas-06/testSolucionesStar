import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SingersModule } from './singers/singers.module';

@Module({
  imports: [SingersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
