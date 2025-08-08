import React from "react";
import TopBanner from "./TopBanner";
import MainHeader from "./MainHeader";
import DropdownNav from "./DropdownNav";
import './Navbar.css';


const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 shadow-lg">
      <TopBanner />
      <MainHeader />
      <DropdownNav />
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
        
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;