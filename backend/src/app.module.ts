import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import postgresConfig from './config/postgres.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.get('postgres.host'),
          port: configService.get('postgres.port'),
          username: configService.get('postgres.username'),
          password: configService.get('postgres.password'),
          database: configService.get('postgres.database'),
          autoLoadEntities: true,
          synchronize: false,
        };
        if (configService.get('STAGE') == 'local') {
          obj = Object.assign(obj, {
            logging: true,
          });
        }
        return obj;
      },
    }),
    PharmacyModule,
    StoreModule,
    ProductModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleWare).forRoutes('*');
  }
}
