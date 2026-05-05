
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { TeaRoute } from './pages/TeaRoute';
import { CustomBlend } from './pages/CustomBlend';
import { CustomBox } from './pages/CustomBox';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminRoute } from './components/AdminRoute';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/ruta-del-te" element={<TeaRoute />} />
          <Route path="/crea-tu-blend" element={<CustomBlend />} />
          <Route path="/arma-tu-box" element={<CustomBox />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
