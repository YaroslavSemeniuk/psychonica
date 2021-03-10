import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { MessageCodeError } from '../errors/message-code-error';
import { AuthCredentialsInterface, IGoogleSheets } from './interfaces/google-auth.interface';

dotenv.config({ path: `env/${process.env.NODE_ENV || 'development'}.env` });

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new MessageCodeError('validation:error', `config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }

  public getGoogleSheetsCredentials():IGoogleSheets {
    return {
      access_token: this.getValue('GOOGLE_ACCESS_TOKEN'),
      refresh_token: this.getValue('GOOGLE_REFRESH_TOKEN'),
      scope: this.getValue('GOOGLE_SCOPE'),
      token_type: 'Bearer',
    };
  }

  getCustomKey(key:string):string {
    return this.getValue(key, true);
  }

  public getGoogleOAuthCredentials(): AuthCredentialsInterface {
    return {
      clientID: this.getValue('GOOGLE_CLIENT_ID'),
      clientSecret: this.getValue('GOOGLE_CLIENT_SECRET'),
    };
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    console.log(__dirname);
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT'), 10),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: [`${__dirname}/../../**/**/**/*.entity{.ts,.js}`],
      synchronize: false,
      migrationsTableName: 'migration',

      migrations: ['dist/migration/*.js'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
      logger: configService.isProduction() ? 'file' : 'advanced-console',
      migrationsRun: configService.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
