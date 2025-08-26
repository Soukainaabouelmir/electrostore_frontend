import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Home from './page/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import PcGamerPage from './Components/Ordinateurs/PcGamer/PcGamerPage';
import PcPortablePage from './Components/Ordinateurs/PcPortable/PcPortablePage';
import PcBureauPage from './Components/Ordinateurs/PcBureau/PcBureauPage';
import LoginPage from './Components/Login/LoginPage';
import AdminDashboard from './page/AdminDashboard';
import { CartProvider } from './Components/Panier/CartContext ';

function AppWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  
  return (
    <div className="app">
      {!isAdminRoute && <Navbar />} 
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pc/gamer" element={<PcGamerPage />} />
          <Route path="/pc/bureau" element={<PcBureauPage />} />
          <Route path="/pc/portable" element={<PcPortablePage />} />
          <Route path="/compte" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />} 
    </div>
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
