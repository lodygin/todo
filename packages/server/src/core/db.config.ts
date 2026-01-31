import { registerAs } from '@nestjs/config';

export const dbConfig = registerAs('db', () => ({
  type: 'postgres' as const,
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER ?? 'todo',
  password: process.env.DB_PASSWORD ?? 'todo',
  database: process.env.DB_NAME ?? 'todo',
  autoLoadEntities: true,
  synchronize: true,
}));
