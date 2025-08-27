import { motion } from 'framer-motion';

const SidebarHeader = ({ isCollapsed, isDarkMode, setIsDarkMode }) => {
  return (
    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
      {!isCollapsed && (
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img 
              src="/ekgamerlogo.png" 
              alt="HR Linktis Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              EK GAMER
            </span>
          </motion.div>
          
         
        </motion.div>
      )}
    </div>
  );
};

export default SidebarHeader;