import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import {
  FiChevronDown,
  FiMonitor,
  FiCpu,
  FiHeadphones,
  FiTool,
  FiMenu,
  FiX,
  FiSettings,
} from "react-icons/fi";

const DropdownNav = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [mobileActiveSubDropdown, setMobileActiveSubDropdown] = useState(null);
  
  const location = useLocation();

  const navItems = [
     {
      title: "Configurateur PC",
      icon: <FiSettings className="text-orange-400" />,
      path: "/configuration",
    },

    {
      
      title: "Ordinateurs",
      icon: <FiMonitor className="text-orange-400"/>,
      dropdown: [
        {
          title: "PC Gamer",
          path: "/pc/gamer",
        },
        {
          title: "PC Bureau",
          path: "/pc/bureau",
        },
        {
          title: "PC Portable",
          path: "/pc/portable",
        },
        {
          title: "PC Ultrabook",
          path: "/pc/ultrabook",
        },
        {
          title: "PC Reconditionnés",
          path: "/pc/reconditionnes",
        },
      ],
    },
   
    {
      title: "Composants",
      icon: <FiCpu className="text-orange-400" />,
      dropdown: [
        {
          title: "Processeurs",
          path: "/composants/processeurs",
          subDropdown: [
            { title: "Intel Core i9", path: "/composants/processeurs/intel-i9" },
            { title: "Intel Core i7", path: "/composants/processeurs/intel-i7" },
            { title: "Intel Core i5", path: "/composants/processeurs/intel-i5" },
            { title: "AMD Ryzen 9", path: "/composants/processeurs/amd-ryzen-9" },
            { title: "AMD Ryzen 7", path: "/composants/processeurs/amd-ryzen-7" },
            { title: "AMD Ryzen 5", path: "/composants/processeurs/amd-ryzen-5" },
          ],
        },
        {
          title: "Cartes graphiques",
          path: "/composants/cartes-graphiques",
          subDropdown: [
            { title: "RTX 4090", path: "/composants/gpu/rtx-4090" },
            { title: "RTX 4080", path: "/composants/gpu/rtx-4080" },
            { title: "RTX 4070", path: "/composants/gpu/rtx-4070" },
            { title: "RTX 4060", path: "/composants/gpu/rtx-4060" },
            { title: "AMD RX 7900", path: "/composants/gpu/amd-rx-7900" },
            { title: "AMD RX 7800", path: "/composants/gpu/amd-rx-7800" },
          ],
        },
        {
          title: "Mémoire RAM",
          path: "/composants/memoire",
          subDropdown: [
            { title: "DDR5 32GB", path: "/composants/ram/ddr5-32gb" },
            { title: "DDR5 16GB", path: "/composants/ram/ddr5-16gb" },
            { title: "DDR4 32GB", path: "/composants/ram/ddr4-32gb" },
            { title: "DDR4 16GB", path: "/composants/ram/ddr4-16gb" },
          ],
        },
        {
          title: "Cartes mères",
          path: "/composants/cartes-meres",
        },
        {
          title: "Stockage SSD/HDD",
          path: "/composants/stockage",
        },
        {
          title: "Alimentations",
          path: "/composants/alimentations",
        },
      ],
    },
    {
      title: "Périphériques",
      icon: <FiMenu className="text-orange-400" />,
      dropdown: [
        {
          title: "Écrans",
          path: "/peripheriques/ecrans",
          subDropdown: [
            { title: "4K Gaming", path: "/peripheriques/ecrans/4k-gaming" },
            { title: "1440p Gaming", path: "/peripheriques/ecrans/1440p-gaming" },
            { title: "Ultrawide", path: "/peripheriques/ecrans/ultrawide" },
            { title: "Moniteur Pro", path: "/peripheriques/ecrans/pro" },
          ],
        },
        {
          title: "Claviers",
          path: "/peripheriques/claviers",
          subDropdown: [
            { title: "Mécanique", path: "/peripheriques/claviers/mecanique" },
            { title: "Membrane", path: "/peripheriques/claviers/membrane" },
            { title: "Gaming RGB", path: "/peripheriques/claviers/gaming-rgb" },
            { title: "Bureau", path: "/peripheriques/claviers/bureau" },
          ],
        },
        {
          title: "Souris",
          path: "/peripheriques/souris",
        },
        {
          title: "Casques",
          path: "/peripheriques/casques",
        },
        {
          title: "Haut-parleurs",
          path: "/peripheriques/haut-parleurs",
        },
        {
          title: "Webcams",
          path: "/peripheriques/webcams",
        },
      ],
    },
    {
      title: "Gaming",
      icon: <FiHeadphones className="text-orange-400" />,
      dropdown: [
        {
          title: "Casques Gaming",
          path: "/gaming/casques",
        },
        {
          title: "Claviers Gaming",
          path: "/gaming/claviers",
        },
        {
          title: "Souris Gaming",
          path: "/gaming/souris",
        },
        {
          title: "Tapis de souris",
          path: "/gaming/tapis-souris",
        },
        {
          title: "Manettes",
          path: "/gaming/manettes",
        },
        {
          title: "Chaises Gaming",
          path: "/gaming/chaises",
        },
      ],
    },
    {
      title: "Services",
      icon: <FiTool className="text-orange-400" />,
      dropdown: [
        {
          title: "Assemblage sur mesure",
          path: "/services/assemblage",
        },
        {
          title: "Maintenance",
          path: "/services/maintenance",
        },
        {
          title: "Upgrade",
          path: "/services/upgrade",
        },
        {
          title: "Support technique",
          path: "/services/support",
        },
        {
          title: "Garantie étendue",
          path: "/services/garantie",
        },
      ],
    },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveSubDropdown(null);
  };

  const toggleSubDropdown = (subIndex) => {
    setActiveSubDropdown(activeSubDropdown === subIndex ? null : subIndex);
  };

  const toggleMobileDropdown = (index) => {
    setMobileActiveDropdown(mobileActiveDropdown === index ? null : index);
    setMobileActiveSubDropdown(null);
  };

  const toggleMobileSubDropdown = (subIndex) => {
    setMobileActiveSubDropdown(
      mobileActiveSubDropdown === subIndex ? null : subIndex
    );
  };

  const handleLinkClick = () => {
    // Fermer tous les menus lors de la navigation
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setIsMobileMenuOpen(false);
    setMobileActiveDropdown(null);
    setMobileActiveSubDropdown(null);
  };

  const handleDropdownClick = (e, index) => {
    e.preventDefault();
    toggleDropdown(index);
  };

  const handleSubDropdownClick = (e, subIndex) => {
    e.preventDefault();
    toggleSubDropdown(subIndex);
  };

  const handleMobileDropdownClick = (e, index) => {
    e.preventDefault();
    toggleMobileDropdown(index);
  };

  const handleMobileSubDropdownClick = (e, subIndex) => {
    e.preventDefault();
    toggleMobileSubDropdown(subIndex);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white shadow-lg border-t border-blue-600">
        <div className="container mx-auto">
          <div className="hidden lg:block">
            <ul className="flex justify-center space-x-1">
              {navItems.map((item, index) => (
                <li key={index} className="relative group">
                  {item.path ? (
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`flex items-center px-6 py-4 hover:bg-blue-700 hover:bg-opacity-40 transition-all duration-300  group-hover:transform group-hover:scale-80 ${
                        location.pathname === item.path ? 'bg-blue-700/70' : ''
                      }`}>
                      <span className="mr-2">{item.icon}</span>
                      {item.title}
                    </Link>
                  ) : (
                    <button
                      onClick={(e) => handleDropdownClick(e, index)}
                      className="flex items-center px-6 py-4 hover:bg-blue-700 hover:bg-opacity-40 transition-all duration-300  group-hover:transform group-hover:scale-90">
                      <span className="mr-2">{item.icon}</span>
                      {item.title}
                      <FiChevronDown
                        className={`ml-2 transition-transform duration-200 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`} />
                    </button>
                  )}
                  {activeDropdown === index && item.dropdown && (
                    <div className="absolute left-0 w-56 bg-white dark:bg-[#141414] text-gray-800 dark:text-gray-200 shadow-xl rounded-b-lg  z-20 animate-slideIn">
                      <div className="py-2">
                        {item.dropdown.map((subItem, subIndex) => (
                          <div key={subIndex} className="relative">
                            {subItem.subDropdown ? (
                              <>
                                <button
                                  onClick={(e) => handleSubDropdownClick(e, subIndex)}
                                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-900 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200  ">
                                  <span>{subItem.title}</span>
                                  <FiChevronDown
                                    className={`ml-2 transition-transform duration-200 ${
                                      activeSubDropdown === subIndex
                                        ? "rotate-180"
                                        : ""
                                    }`}
                                  />
                                </button>
                                {activeSubDropdown === subIndex && (
                                  <div className="absolute left-full top-0 w-48 bg-white dark:bg-[#141414] shadow-lg   z-30">
                                    <div className="py-2">
                                      {subItem.subDropdown.map(
                                        (nestedItem, nestedIndex) => (
                                          <Link
                                            key={nestedIndex}
                                            to={nestedItem.path}
                                            onClick={handleLinkClick}
                                            className={`block px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-900 hover:text-blue-700 dark:hover:text-blue-400 transition-colors ${
                                              location.pathname === nestedItem.path ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''
                                            }`}>
                                            {nestedItem.title}
                                          </Link>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                to={subItem.path}
                                onClick={handleLinkClick}
                                className={`block px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-900 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200  ${
                                  location.pathname === subItem.path ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 ' : ''
                                }`}
                              >
                                {subItem.title}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-600 transition-colors">
              <FiMenu className="text-xl" />
              <span className="font-medium">Menu</span>
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm opacity-90">Toutes catégories</span>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`} >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div
          className={`fixed left-0 top-0 h-full w-80 max-w-sm bg-white dark:!bg-[#141414] dark:!text-gray-300 shadow-xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`} >
          <div className="flex items-center justify-between p-4 ">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-900 dark:text-blue-400">
                PC
              </span>
              <span className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                Shop
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1e1e1e]">
              <FiX className="text-xl" />
            </button>
          </div>
          <nav className="overflow-y-auto h-full pb-20">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="" >
                {item.path ? (
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`w-full flex items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors ${
                      location.pathname === item.path ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''
                    }`}>
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={(e) => handleMobileDropdownClick(e, index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors" >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <FiChevronDown
                        className={`transition-transform duration-200 ${
                          mobileActiveDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileActiveDropdown === index && item.dropdown && (
                  <div className="bg-gray-50 dark:bg-[#1e1e1e]">
                    {item.dropdown.map((subItem, subIndex) => (
                      <div key={subIndex}>
                        {subItem.subDropdown ? (
                          <>
                            <button
                              onClick={(e) => handleMobileSubDropdownClick(e, subIndex)}
                              className="w-full flex items-center justify-between px-8 py-3 text-left text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-700 transition-colors">
                              <span>{subItem.title}</span>
                              <FiChevronDown
                                className={`ml-2 transition-transform duration-200 ${
                                  mobileActiveSubDropdown === subIndex
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                            {mobileActiveSubDropdown === subIndex && (
                              <div className="bg-white dark:bg-gray-700">
                                {subItem.subDropdown.map(
                                  (nestedItem, nestedIndex) => (
                                    <Link
                                      key={nestedIndex}
                                      to={nestedItem.path}
                                      onClick={handleLinkClick}
                                      className={`block px-12 py-2 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${
                                        location.pathname === nestedItem.path ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''
                                      }`}
                                    >
                                      {nestedItem.title}
                                    </Link>
                                  )
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            to={subItem.path}
                            onClick={handleLinkClick}
                            className={`block px-8 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-700 transition-colors ${
                              location.pathname === subItem.path ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        )}
                      </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default DropdownNav;