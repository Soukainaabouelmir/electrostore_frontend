import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './Components/Login/AuthContext'; // Ajoutez cette ligne

import Home from './page/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import PcGamerPage from './Components/Ordinateurs/PcGamer/PcGamerPage';
import PcPortablePage from './Components/Ordinateurs/PcPortable/PcPortablePage';
import PcBureauPage from './Components/Ordinateurs/PcBureau/PcBureauPage';
import LoginPage from './Components/Login/LoginPage';
import AdminDashboard from './page/AdminDashboard';
import { CartProvider } from './Components/Panier/CartContext ';
import Layout from './Components/EspaceAdmin/Layouts/layouts';
import { LanguageProvider } from './Components/EspaceAdmin/Navbar/LanguageContext';
import SignUpPage from './Components/SignUp/SignUpPage';
import CategoriesManagement from './Components/EspaceAdmin/ListeProducts/Categories/CategoriesManagement';
import MarqueManagement from './Components/EspaceAdmin/ListeProducts/Marque/MarqueManagement';

function AppWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <LanguageProvider>
      <AuthProvider> {/* Ajoutez l'AuthProvider ici */}
        <div className="app">
          {!isAdminRoute && <Navbar />} 
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pc/gamer" element={<PcGamerPage />} />
              <Route path="/pc/bureau" element={<PcBureauPage />} />
              <Route path="/pc/portable" element={<PcPortablePage />} />
              <Route path="/compte" element={<LoginPage />} />
              <Route path="/admin/dashboard" element={<Layout> <AdminDashboard /></Layout>} />
              <Route path="/admin/categories" element={<Layout> <CategoriesManagement /></Layout>} />
              <Route path="/admin/marque" element={<Layout> <MarqueManagement /></Layout>} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </main>
          {!isAdminRoute && <Footer />} 
        </div>
      </AuthProvider> {/* Fermez l'AuthProvider ici */}
    </LanguageProvider>
  );
}

function App() {
  return (
    <CartProvider> 
      <Router>
        <AppWrapper />
      </Router>
    </CartProvider>
  );
}

export default App;