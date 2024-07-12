import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { join } from "path";
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from "typeorm-extension";
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

dotenvConfig({ path: join(__dirname, '../../../', '.env') })

const config: PostgresConnectionOptions & SeederOptions = {
    type: 'postgres',
    host: `${process.env.DB_HOST}`,
    port: Number(process.env.DB_PORT),
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
    seeds: [join(__dirname, '/../../', 'database/seeds/**/*.seeder{.ts,.js}')],
    synchronize: true,
}

export default registerAs('typeorm', () => config)

export const connectionSource = new DataSource(config as DataSourceOptions)