import config from '../../config.json';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import { User } from '../users/user.model';
import userModelInitializer from '../users/user.model'; // 1. Use standard import

export interface Database {
    User: typeof User;
}

export const db: Database = {} as Database;

// 2. Ensure 'export' is explicitly here
export async function initialize(): Promise<void> {
    const { host, port, user, password, database } = config.database;

    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // 3. Simplified initialization
    db.User = userModelInitializer(sequelize);

    await sequelize.sync({ alter: true });

    console.log('✅ Database initialized and models synced');
}