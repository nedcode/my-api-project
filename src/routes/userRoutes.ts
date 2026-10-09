import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const router = Router();

// Benutzer erstellen
router.post('/', async (req, res) => {
  const { email, name } = req.body ?? {};
  if (typeof email !== 'string' || !email || typeof name !== 'string' || !name) {
    res.status(400).json({ error: 'Fehler beim Erstellen des Benutzers' });
    return;
  }

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create({ email, name });
    const result = await userRepository.save(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Fehler beim Erstellen des Benutzers' });
  }
});

// Benutzerliste abrufen
router.get('/', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Benutzer' });
  }
});

export default router;
