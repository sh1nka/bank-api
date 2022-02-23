import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const BankApiDbTestProvider = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      type: 'mysql',
      host: config.get('DB_HOST'),
      port: config.get('DB_PORT'),
      username: config.get('DB_USER'),
      password: config.get('DB_PASS'),
      database: config.get('DB_DATABASE_TEST'),
      autoLoadEntities: true,
      synchronize: true, // set to false when in prod, set to false when migrations working on DEV
    }),
  }),
];
