
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { TeaRoute } from './pages/TeaRoute';
import { CustomBlend } from './pages/CustomBlend';
import { CustomBox } from './pages/CustomBox';
import { MyOrders } from './pages/MyOrders';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminRoute } from './components/AdminRoute';
import './App.css';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isMyOrdersRoute = location.pathname.startsWith('/mis-pedidos');

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
          <Route path="/mis-pedidos" element={<MyOrders />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </main>
      {(!isAdminRoute && !isMyOrdersRoute) && <Footer />}
    </>
  );
}

export default App;
