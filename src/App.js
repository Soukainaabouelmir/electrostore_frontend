import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './page/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { CartProvider } from './Components/Panier/CartContext ';
import PcGamerPage from './Components/Ordinateurs/PcGamer/PcGamerPage';



function App() {
  return (
    <CartProvider> {/* Enveloppez toute l'application avec CartProvider */}
      <Router>
        <div className="app">
          <Navbar /> {/* MainHeader utilise useCart() qui a maintenant accès au contexte */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pc/gamer" element={<PcGamerPage />} />
             
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;