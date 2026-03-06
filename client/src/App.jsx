import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import ProductDetail from './pages/ProductDetail';
import APropos from './pages/APropos';
import SurMesure from './pages/SurMesure';
import Panier from './pages/Panier';
import Contact from './pages/Contact';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AdminProvider } from './context/AdminContext';
import { LanguageProvider } from './context/LanguageContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminDevis from './pages/admin/AdminDevis';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/catalogue" element={<PageTransition><Catalogue /></PageTransition>} />
          <Route path="/catalogue/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/a-propos" element={<PageTransition><APropos /></PageTransition>} />
          <Route path="/sur-mesure" element={<PageTransition><SurMesure /></PageTransition>} />
          <Route path="/panier" element={<PageTransition><Panier /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="devis" element={<AdminDevis />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AdminProvider>
        <CartProvider>
          <BrowserRouter>
            <ThemeProvider>
              <AnimatedRoutes />
            </ThemeProvider>
          </BrowserRouter>
        </CartProvider>
      </AdminProvider>
    </LanguageProvider>
  );
}
