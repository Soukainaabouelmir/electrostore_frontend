import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome,
  FiUsers,
  FiLayers ,
  FiSettings,
  FiUserCheck  ,
  FiDollarSign ,
  FiFileText ,
  FiList,
  FiChevronDown,
  FiBookOpen,
  FiBarChart2,
  FiFolder
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../Navbar/LanguageContext';

const SidebarMenu = ({ isCollapsed, activeDropdown, toggleDropdown }) => {
  const location = useLocation();
  const { t } = useLanguage();

  // Configuration des éléments du menu avec traductions
  const menuItems = [ 
    {
      title: t("administration"),
      isSection: true
    },
    {
      title: t("dashboard"),
      icon: <FiHome />,
      path: "/dashboard/admin"
    },
    {
      title: t("admin"),
      path: "/Company/structure",
      icon: <FiLayers />,
      submenu: [
        { title: t("companyStructure"), path: "/Company/structure" },
        { title: t("jobDetailsSetup"), path: "/job/details" },
        { title: t("qualificationsSetup"), path: "/qualifications/setup" },
        { title: t("resourcePerProject"), path: "/ressources/per/project" },
        { title: t("clients"), path: "/clients" },
    
      ]
    },
    {
      title: t("employeesSection"),
      isSection: true,
    },
    {
      title: t("employees"),
      path: "/employees" ,
      icon: <FiUsers />,
      submenu: [
        { title: t("employees"), path: "/employees" },
      ]
    },
    {
      title: t("manage"),
      path: "/documents",
      icon: <FiList />,
      submenu: [
        { title: t("documents"), path: "/documents" },
        { title: t("attendance"), path: "/attendance" },
        { title: t("overtime"), path: "/overtime" },
        { title: t("vacation"), path: "/vacation" },
        { title: t("loans"), path: "/loans"}
      ]
    },
   
    {
      title: t("system"),
      path: "/settings",
      icon: <FiSettings />,
      submenu: [
        { title: t("settings"), path: "/settings" },
        { title: t("users"), path: "/users" },
       
      ]
    },
   {
  title: t("payroll"),
  icon: <FiDollarSign />,
  submenu: [
    { title: t("rate_and_tax"), path: "/taux-taxe" },
    { title: t("salary"), path: "/salaire" },
    { title: t("bonuses"), path: "/payroll/" },
  
    // { title: t("allowances"), path: "/payroll/allowances" },
    { title: t("reimbursements"), path: "/notes-de-frais" },
    { title: t("payslips"), path: "/payroll" },
  
  ]
},

    {
      title: t("personalInformation"),
      icon: <FiUserCheck />,
      submenu: [
        { title: t("personalDashboard"), path: "/dashboard" },
        { title: t("profile"), path: "/profile" },
        { title: t("personalDocuments"), path: "/documents/informations" },
        { title: t("personalVacation"), path: "/vacation/informations"},
        {title:t("overtime"),path:"/overtime/personal"},
        {title:t("attendance"),path:"/attendance/personal"},
        {title:t("trainings"), path:"/training/personal"},
        { title: t("payslips"), path: "/payroll/payslips" },
      ]
    },
    //  {
    //   title: t("myproject"),
    //   path: "/mes-projets",
    //   icon: <FiFolder />,
    //   submenu: [
    //     { title: t("mesprojets"), path: "/mes-projets" },
    //   ]
    // },
    // {
    //   title: t("projectmanagement"),
    //   path: "/project/management",
    //   icon: <FiFolder />,
    //   submenu: [
    //     { title: t("mesprojets"), path: "/mes-projets" },
    //   ]
    // },
    {
      title: t("training"),
      path: "/training",
      icon: <FiBookOpen />,
      submenu: [
        { title: t("trainings"), path: "/training" },
      ]
    },
    
  ];

  const MenuItem = ({ item, isCollapsed, activeDropdown, toggleDropdown, location }) => {
    const hasSubmenu = item.submenu && !isCollapsed;
    
    const handleClick = (e) => {
      if (hasSubmenu) {
        e.preventDefault();
        toggleDropdown(item.title);
      }
    };

    return (
      <motion.div
        className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link 
          to={item.path || '#'} 
          className="menu-link"
          title={isCollapsed ? item.title : ''}
          onClick={handleClick}
        >
          <span className="menu-icon">{item.icon}</span>
          {!isCollapsed && (
            <>
              <span className="menu-title" style={{ 
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '160px',
                display: 'inline-block'
              }}>
                {item.title}
              </span>
              {hasSubmenu && (
                <span 
                  className=" text-white  w-4 h-4 flex items-center justify-center ml-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown(item.title);
                  }}
                  style={{
                    transform: activeDropdown === item.title ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
               <FiChevronDown size={16} />
                </span>
              )}
            </>
          )}
        </Link>
      </motion.div>
    );
  };

  // SubMenu component
  const SubMenu = ({ submenu, isActive, location }) => {
    return (
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="submenu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {submenu.map((subItem, subIndex) => (
              <motion.div
                key={subIndex}
                className={`submenu-item ${location.pathname === subItem.path ? 'active' : ''}`}
                whileHover={{ x: 5 }}
              >
                <Link to={subItem.path}>{subItem.title}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const handleDropdownToggle = (title) => {
    toggleDropdown(activeDropdown === title ? null : title);
  };

  return (
    <div className="sidebar-menu">
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.isSection ? (
            !isCollapsed && <div className="menu-section">{item.title}</div>
          ) : (
            <div className="menu-item-container" key={`item-${index}`}>
              <MenuItem 
                item={item}
                isCollapsed={isCollapsed}
                activeDropdown={activeDropdown}
                toggleDropdown={handleDropdownToggle}
                location={location}
              />

              {!isCollapsed && item.submenu && (
                <SubMenu 
                  submenu={item.submenu} 
                  isActive={activeDropdown === item.title}
                  location={location}
                />
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SidebarMenu;