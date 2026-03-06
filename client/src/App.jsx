import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
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

export default function App() {
  return (
    <LanguageProvider>
      <AdminProvider>
        <CartProvider>
          <BrowserRouter>
            <ThemeProvider>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/catalogue/:slug" element={<ProductDetail />} />
                <Route path="/a-propos" element={<APropos />} />
                <Route path="/sur-mesure" element={<SurMesure />} />
                <Route path="/panier" element={<Panier />} />
                <Route path="/contact" element={<Contact />} />
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
            </ThemeProvider>
          </BrowserRouter>
        </CartProvider>
      </AdminProvider>
    </LanguageProvider>
  );
}
