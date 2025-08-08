import React,{useState} from "react";
import {FiChevronDown,FiX} from 'react-icons/fi';


const MobileNavigation = ({ isOpen, onClose, navItems }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className={`lg:hidden  fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-0 bg-black  bg-opacity-50" onClick={onClose}></div>
      
      <div className={`fixed left-0 top-0 h-full w-80 max-w-sm bg-white dark:!bg-[#141414] dark:!text-gray-300 shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between  dark:!bg-[#141414] p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-900 dark:text-blue-400">PC</span>
            <span className="text-2xl font-bold text-orange-500 dark:text-orange-400">Shop</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#141414]">
            <FiX className="text-xl" />
          </button>
        </div>
        
        <nav className="overflow-y-auto h-full pb-20">
          {navItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100 dark:border-gray-800">
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === index && (
                <div className="bg-gray-50 dark:bg-[#1e1e1e]">
                  {item.dropdown.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="block px-12 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-900 transition-colors"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
export default MobileNavigation;