import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Tipos
interface TestItem {
  id: number;
  name: string;
  status: 'pending' | 'passed' | 'failed';
  timestamp: string;
}

// Base de datos en memoria (para testing)
let tests: TestItem[] = [
  { id: 1, name: 'Test de conexión', status: 'passed', timestamp: new Date().toISOString() },
  { id: 2, name: 'Test de API', status: 'passed', timestamp: new Date().toISOString() },
];

// Rutas
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: '🚀 API de Testeo funcionando correctamente',
    version: '1.0.0',
    endpoints: [
      'GET /api/tests - Obtener todos los tests',
      'POST /api/tests - Crear nuevo test',
      'GET /api/health - Estado del servidor'
    ]
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/tests', (req: Request, res: Response) => {
  res.json({ success: true, data: tests });
});

app.post('/api/tests', (req: Request, res: Response) => {
  const { name, status } = req.body;
  
  if (!name || !status) {
    return res.status(400).json({ 
      success: false, 
      error: 'Nombre y status son requeridos' 
    });
  }

  const newTest: TestItem = {
    id: tests.length + 1,
    name,
    status,
    timestamp: new Date().toISOString()
  };

  tests.push(newTest);
  res.status(201).json({ success: true, data: newTest });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
