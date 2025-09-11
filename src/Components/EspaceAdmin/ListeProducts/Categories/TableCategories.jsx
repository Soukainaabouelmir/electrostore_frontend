import ActionButtons from "./ActionsButtons";
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import React from "react";

const TableCategories = ({ categories, onEdit, onDelete }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const renderCategories = (categoriesToRender, level = 0) => {
    return categoriesToRender.map((category) => (
      <React.Fragment key={category.id}>
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td className="px-4 py-2 whitespace-nowrap" style={{ paddingLeft: `${level * 20 + 8}px` }}>
            <div className="flex items-center">
              {category.children && category.children.length > 0 && (
                <button 
                  onClick={() => toggleCategory(category.id)}
                  className="mr-1 focus:outline-none"
                >
                  {expandedCategories[category.id] ? (
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              )}
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {category.nom}
              </div>
            </div>
          </td>
          <td className="px-4 py-2 whitespace-nowrap">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {category.parent || 'Catégorie principale'}
            </div>
          </td>
          <td className="px-4 py-2">
            <div className="flex flex-wrap gap-1">
              {category.subCategories && category.subCategories.length > 0 ? (
                category.subCategories.slice(0, 3).map((sub, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {sub}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Aucune sous-catégorie
                </span>
              )}
              {category.subCategories && category.subCategories.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{category.subCategories.length - 3} autres
                </span>
              )}
            </div>
          </td>
          <td className="px-4 py-2 whitespace-nowrap">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              category.status === 'active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {category.status === 'active' ? 'Actif' : 'Inactif'}
            </span>
          </td>
          <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
            <ActionButtons
              onEdit={() => onEdit(category)}
              onDelete={() => onDelete(category)}
            />
          </td>
        </tr>
        {expandedCategories[category.id] && category.children && category.children.length > 0 && (
          <>
            {renderCategories(category.children, level + 1)}
          </>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="bg-white dark:bg-[#1a202c] shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Liste des Catégories
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Catégorie Parent
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Sous-catégories
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#1a202c] divide-y divide-gray-200 dark:divide-gray-800">
            {renderCategories(categories)}
          </tbody>
        </table>
      </div>
      
      {categories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">Aucune catégorie trouvée</p>
            <p className="text-sm">Commencez par ajouter votre première catégorie</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCategories;