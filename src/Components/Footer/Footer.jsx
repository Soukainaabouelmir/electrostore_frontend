import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Truck, Shield, RotateCcw } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:!bg-[#141414] text-gray-800 dark:!text-white py-4">
        
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-500 ">PCShop</h3>
            <p className="text-gray-600 dark:!text-gray-400 text-sm leading-relaxed">
              Votre destination premium pour les équipements gaming. 
              Claviers mécaniques, casques haute performance et accessoires 
              pour les gamers passionnés.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Produits */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Nos Produits</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:!text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">Claviers Mécaniques</a></li>
<li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">Claviers RGB</a></li>
<li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">Casques Gaming</a></li>
<li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">Casques Sans Fil</a></li>
<li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">Accessoires</a></li>
<li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">Nouveautés</a></li>
            </ul>
          </div>

          {/* Support Client */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support Client</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 transition-colors">Guide d'achat</a></li>
              <li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 transition-colors">Retours & Échanges</a></li>
              <li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 transition-colors">Garantie</a></li>
              <li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 dark:!text-gray-400 hover:text-blue-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold ">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 dark:!text-gray-400">+212 5XX-XXX-XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600 dark:!text-gray-400">contact@gamegear.ma</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-500 mt-1" />
                <span className="text-gray-600 dark:!text-gray-400">
                  123 Avenue Hassan II<br />
                  Casablanca, Maroc
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section avantages */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Truck className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold text-sm">Livraison Gratuite</p>
                <p className="text-xs text-gray-400">Commandes +500 DH</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold text-sm">Garantie 2 ans</p>
                <p className="text-xs text-gray-400">Sur tous nos produits</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold text-sm">Retour 30 jours</p>
                <p className="text-xs text-gray-400">Satisfait ou remboursé</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold text-sm">Paiement Sécurisé</p>
                <p className="text-xs text-gray-400">SSL & Cryptage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 GameGear Store. Tous droits réservés.
            </div>
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;