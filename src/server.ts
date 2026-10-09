import app from './app';
import { AppDataSource } from './data-source';

const PORT = process.env.PORT || 3000;

// Datenbankverbindung initialisieren, dann Server starten
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
    process.exit(1);
  });
