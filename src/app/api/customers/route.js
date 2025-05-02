import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function GET() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: { rejectUnauthorized: false },
  });

  try {
    const [rows] = await connection.execute('SELECT * FROM customer_balances');
    await connection.end();
    return Response.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    await connection.end();
    return new NextResponse({ error: 'Internal Server Error' }, {
      status: 500,
    });
  }
}