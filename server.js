import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import taskRoutes from './routes/tasks.js';
import configRoutes from './routes/config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/tasks', taskRoutes);
app.use('/api/config', configRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

export default app;
