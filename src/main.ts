import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AuthGuard } from './app/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard());
  await app.listen(3000);
}
bootstrap();
