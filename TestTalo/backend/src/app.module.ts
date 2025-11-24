import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { user } from './entities/user.entity';
import { taloTestModule } from './taloTest.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'talo-test',
      entities: [user],
      synchronize: true,
      dropSchema: true
    }), 
    taloTestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
