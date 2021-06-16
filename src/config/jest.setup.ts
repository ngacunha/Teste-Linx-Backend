import { Connection, createConnection } from 'typeorm';

let connection: Connection;

beforeAll(async () => {
  connection = await createConnection();
});

beforeEach(async () => {
  await connection.query("DELETE FROM users WHERE email='user@tester.com'");
});

afterAll(async () => {
  await connection.close();
});
