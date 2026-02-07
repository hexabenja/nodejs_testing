import { useState, useEffect } from 'react'
import './App.css'

interface TestItem {
  id: number;
  name: string;
  status: 'pending' | 'passed' | 'failed';
  timestamp: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [tests, setTests] = useState<TestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTestName, setNewTestName] = useState('');
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    fetchTests();
    fetchHealth();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tests`);
      const data = await response.json();
      setTests(data.data);
    } catch (error) {
      console.error('Error al cargar tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/health`);
      const data = await response.json();
      setHealth(data);
    } catch (error) {
      console.error('Error al verificar salud:', error);
    }
  };

  const addTest = async (status: 'pending' | 'passed' | 'failed') => {
    if (!newTestName.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/tests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTestName, status }),
      });
      const data = await response.json();
      
      if (data.success) {
        setTests([...tests, data.data]);
        setNewTestName('');
      }
    } catch (error) {
      console.error('Error al crear test:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return '#4ade80';
      case 'failed': return '#f87171';
      default: return '#fbbf24';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'passed': return '✅';
      case 'failed': return '❌';
      default: return '⏳';
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="app">
      <header>
        <h1>🧪 Test App</h1>
        <p>Aplicación de testing con TypeScript + Node.js + React</p>
        {health && (
          <div className="health-badge">
            <span className="status-dot"></span>
            Servidor activo | Uptime: {Math.floor(health.uptime)}s
          </div>
        )}
      </header>

      <main>
        <section className="add-test">
          <h2>Agregar Nuevo Test</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Nombre del test..."
              value={newTestName}
              onChange={(e) => setNewTestName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTest('pending')}
            />
            <div className="button-group">
              <button onClick={() => addTest('pending')} className="btn-pending">
                Pending
              </button>
              <button onClick={() => addTest('passed')} className="btn-passed">
                Passed
              </button>
              <button onClick={() => addTest('failed')} className="btn-failed">
                Failed
              </button>
            </div>
          </div>
        </section>

        <section className="tests-list">
          <h2>Tests ({tests.length})</h2>
          <div className="tests-grid">
            {tests.map((test) => (
              <div key={test.id} className="test-card">
                <div className="test-header">
                  <span className="test-emoji">{getStatusEmoji(test.status)}</span>
                  <h3>{test.name}</h3>
                </div>
                <div className="test-info">
                  <span 
                    className="test-status" 
                    style={{ backgroundColor: getStatusColor(test.status) }}
                  >
                    {test.status}
                  </span>
                  <span className="test-time">
                    {new Date(test.timestamp).toLocaleString('es')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>Deploy ready 🚀 | TypeScript + Node.js + React</p>
      </footer>
    </div>
  )
}

export default App
