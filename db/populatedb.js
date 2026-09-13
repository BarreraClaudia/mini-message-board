#! /usr/bin/env node

import { Client } from 'pg';

const databaseUrl = process.argv[2];

if (!databaseUrl) {
  console.error(
    'Please provide a database connection string as an argument: node db/populatedb.js <url>',
  );
  process.exit(1);
}

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO messages (name, message)
VALUES
('Dania', 'Sending good vibes your way!'),
('Leslie', 'You''re doing amazing, sweetie.'),
('Alyn', 'You got this.');
`;

async function main() {
  console.log('seeding...');

  const client = new Client({
    connectionString: databaseUrl,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log('done seeding');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
