import { Connection, createConnection } from 'typeorm';

let connection: Connection;
jest.setTimeout(10000);
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

  await connection.query(
    "DELETE FROM transactions WHERE client_id='cliente-teste-id-1'",
  );
});

afterAll(async () => {
  await connection.close();
});
