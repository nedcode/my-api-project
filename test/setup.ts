import { AppDataSource } from '../src/data-source';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

// Datenbank vor jedem Test zurücksetzen
beforeEach(async () => {
  for (const entity of AppDataSource.entityMetadatas) {
    await AppDataSource.getRepository(entity.name).clear();
  }
});
