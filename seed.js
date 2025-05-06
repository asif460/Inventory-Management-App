const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'kashif', // your database name
  password: 'aseef123', // your actual PostgreSQL password
  port: 5432,
});

async function seed() {
  try {
    await client.connect();
    console.log('✅ Connected to the database');

    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        quantity INTEGER NOT NULL,
        price NUMERIC(10, 2) NOT NULL
      );
    `);

    await client.query(`
      INSERT INTO items (name, quantity, price)
      VALUES 
        ('Laptop', 10, 1200.50),
        ('Keyboard', 25, 45.99),
        ('Monitor', 5, 300.00)
      ON CONFLICT DO NOTHING;
    `);

    console.log('🌱 Seeding completed successfully');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await client.end();
  }
}

seed();
