import React, { useState } from 'react';

const CategoryModal = ({ category, categories, onSave, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    nom: category?.nom || '',
    parent: category?.parent || '',
    subCategories: category?.subCategories || [],
    status: category?.status || 'active'
  });

  const [newSubCategory, setNewSubCategory] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    onSave(formData);
  };

  const addSubCategory = () => {
    if (newSubCategory.trim() && !formData.subCategories.includes(newSubCategory.trim())) {
      setFormData({
        ...formData,
        subCategories: [...formData.subCategories, newSubCategory.trim()]
      });
      setNewSubCategory('');
    }
  };

  const removeSubCategory = (index) => {
    setFormData({
      ...formData,
      subCategories: formData.subCategories.filter((_, i) => i !== index)
    });
  };

  const parentCategories = categories.filter(cat => !cat.parent && cat.id !== category?.id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1a202c] rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de la catégorie *
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white ${
                  errors.nom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.nom && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nom}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Catégorie parent
              </label>
              <select
                value={formData.parent}
                onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Catégorie principale</option>
                {parentCategories.map(cat => (
                  <option key={cat.id} value={cat.nom}>
                    {cat.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sous-catégories
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSubCategory}
                onChange={(e) => setNewSubCategory(e.target.value)}
                placeholder="Ajouter une sous-catégorie"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubCategory())}
              />
              <button
                type="button"
                onClick={addSubCategory}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Ajouter
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.subCategories.map((sub, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {sub}
                  <button
                    type="button"
                    onClick={() => removeSubCategory(index)}
                    className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-300 font-semibold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              {category ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CategoryModal;