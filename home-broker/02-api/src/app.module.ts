import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AssetsModule } from './assets/assets.module';
import { WalletsModule } from './wallets/wallets.module';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SimulateAssetsPriceCommand } from './simulate-assets-price.command';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AssetsModule,
    WalletsModule,
    OrdersModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PrometheusModule.register({
      defaultLabels: {
        version: 'v1',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SimulateAssetsPriceCommand],
})
export class AppModule {}
