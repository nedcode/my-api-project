import request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/data-source';
import { User } from '../src/entity/User';

describe('User API Integration Tests', () => {

  it('should create a new user via API', async () => {
    // Arrange
    const userData = {
      email: 'test@example.com',
      name: 'Test User'
    };

    // Act
    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    // Assert – Antwort prüfen
    expect(response.body.id).toBeDefined();
    expect(response.body.email).toBe(userData.email);
    expect(response.body.name).toBe(userData.name);

    // Assert – Datenbank direkt prüfen
    const userRepository = AppDataSource.getRepository(User);
    const savedUser = await userRepository.findOneBy({ id: response.body.id });
    expect(savedUser).not.toBeNull();
    expect(savedUser?.email).toBe(userData.email);
  });

  it('should retrieve user list via API', async () => {
    // Arrange – Testdaten direkt in die Datenbank schreiben
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save([
      { email: 'user1@example.com', name: 'User One' },
      { email: 'user2@example.com', name: 'User Two' }
    ]);

    // Act
    const response = await request(app)
      .get('/api/users')
      .expect(200);

    // Assert
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].email).toBeDefined();
    expect(response.body[0].name).toBeDefined();
  });

  it('should return 400 for invalid user data', async () => {
    await request(app)
      .post('/api/users')
      .send({ invalid: 'data' })
      .expect(400);
  });

});