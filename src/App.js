import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './page/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { CartProvider } from './Components/Panier/CartContext ';
import PcGamerPage from './Components/Ordinateurs/PcGamer/PcGamerPage';
import PcBureauCard from './Components/Ordinateurs/PcBureau/PcBureauCard';



function App() {
  return (
    <CartProvider> 
      <Router>
        <div className="app">
          <Navbar /> 
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pc/gamer" element={<PcGamerPage />} />
              <Route path="/pc/bureau" element={<PcBureauCard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;