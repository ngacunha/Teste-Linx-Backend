import { Connection, createConnection } from 'typeorm';

let connection: Connection;

beforeAll(async () => {
  connection = await createConnection();
});

beforeEach(async () => {
  await connection.query("DELETE FROM users WHERE email='user@tester.com'");
  await connection.query(
    "DELETE FROM users WHERE email='usertestauth@tester.com'",
  );
  await connection.query(
    "DELETE FROM users WHERE email='usertestnoauth@tester.com'",
  );
});

afterAll(async () => {
  await connection.close();
});
