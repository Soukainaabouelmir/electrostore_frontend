import React, { useState, useEffect } from 'react';

const MarqueModal = ({ Marque, categories, onSave, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    nom: Marque?.nom || '',
    parent_id: Marque?.parent_id || null,
    parent_name: Marque?.parent || '',
    status: Marque?.status || 'active',
    subCategories: Marque?.subCategories || []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSubMarque, setNewSubMarque] = useState('');
  const [subMarqueData, setSubMarqueData] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        nom: Marque?.nom || '',
        parent_id: Marque?.parent_id || null,
        parent_name: Marque?.parent || '',
        status: Marque?.status || 'active',
        subCategories: Marque?.subCategories || []
      });
      setErrors({});
      setNewSubMarque('');
      setSubMarqueData({});
    }
  }, [Marque, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    const existingMarque = categories.find(cat => 
      cat.nom.toLowerCase() === formData.nom.trim().toLowerCase() && 
      cat.id !== Marque?.id
    );
    
    if (existingMarque) {
      newErrors.nom = 'Une catégorie avec ce nom existe déjà';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSubMarque = () => {
    const trimmedName = newSubMarque.trim();
    if (trimmedName && !formData.subCategories.includes(trimmedName)) {
      setFormData({
        ...formData,
        subCategories: [...formData.subCategories, trimmedName]
      });
      // Initialiser les sous-sous-catégories pour cette nouvelle sous-catégorie
      setSubMarqueData({
        ...subMarqueData,
        [trimmedName]: []
      });
      setNewSubMarque('');
    }
  };

  const removeSubMarque = (index) => {
    const subMarqueToRemove = formData.subCategories[index];
    const newSubCategories = formData.subCategories.filter((_, i) => i !== index);
    
    setFormData({
      ...formData,
      subCategories: newSubCategories
    });
    
    // Supprimer aussi les données de sous-sous-catégories
    const newSubMarqueData = { ...subMarqueData };
    delete newSubMarqueData[subMarqueToRemove];
    setSubMarqueData(newSubMarqueData);
  };

  const addSubSubMarque = (parentSubMarque, subSubMarqueName) => {
    const trimmedName = subSubMarqueName.trim();
    if (trimmedName && !subMarqueData[parentSubMarque]?.includes(trimmedName)) {
      setSubMarqueData({
        ...subMarqueData,
        [parentSubMarque]: [...(subMarqueData[parentSubMarque] || []), trimmedName]
      });
    }
  };

  const removeSubSubMarque = (parentSubMarque, index) => {
    const newSubSubCategories = subMarqueData[parentSubMarque].filter((_, i) => i !== index);
    setSubMarqueData({
      ...subMarqueData,
      [parentSubMarque]: newSubSubCategories
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});

    try {
      // Préparer les données pour l'API
      const dataToSend = {
        nom: formData.nom.trim(),
        parent_id: formData.parent_id,
        status: formData.status,
        subCategories: formData.subCategories,
        subMarqueData: subMarqueData // Inclure les sous-sous-catégories
      };

      await onSave(dataToSend);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleParentChange = (e) => {
    const selectedParentName = e.target.value;
    let selectedParentId = null;
    
    if (selectedParentName) {
      const parentMarque = categories.find(cat => cat.nom === selectedParentName);
      selectedParentId = parentMarque ? parentMarque.id : null;
    }
    
    setFormData({
      ...formData,
      parent_name: selectedParentName,
      parent_id: selectedParentId,
      // Clear subcategories when selecting a parent
      subCategories: selectedParentId ? [] : formData.subCategories
    });
    
    // Clear sub-subMarque data when changing parent
    if (selectedParentId) {
      setSubMarqueData({});
    }
  };

  const parentCategories = categories.filter(cat => 
    cat.isMainMarque !== false && 
    cat.id !== Marque?.id && 
    !cat.parent_id 
  );

  const SubSubMarqueInput = ({ parentSubMarque }) => {
    const [newSubSubMarque, setNewSubSubMarque] = useState('');

    return (
      <div className="ml-4 mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
        <h5 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
          Sous-catégories de "{parentSubMarque}"
        </h5>
        
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newSubSubMarque}
            onChange={(e) => setNewSubSubMarque(e.target.value)}
            placeholder="Nom de la sous-sous-catégorie"
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            disabled={isSubmitting}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSubSubMarque(parentSubMarque, newSubSubMarque);
                setNewSubSubMarque('');
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              addSubSubMarque(parentSubMarque, newSubSubMarque);
              setNewSubSubMarque('');
            }}
            className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={isSubmitting || !newSubSubMarque.trim()}
          >
            +
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {(subMarqueData[parentSubMarque] || []).map((subSub, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              {subSub}
              <button
                type="button"
                onClick={() => removeSubSubMarque(parentSubMarque, index)}
                className="ml-1 text-green-600 hover:text-green-800 dark:text-green-300 font-semibold"
                disabled={isSubmitting}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        
        {(!subMarqueData[parentSubMarque] || subMarqueData[parentSubMarque].length === 0) && (
          <p className="text-xs text-gray-400 dark:text-gray-500 italic">
            Aucune sous-sous-catégorie ajoutée
          </p>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1a202c] rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {Marque ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
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
                disabled={isSubmitting}
                placeholder="Entrez le nom de la catégorie"
              />
              {errors.nom && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nom}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Statut
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                disabled={isSubmitting}
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Catégorie parent (optionnel)
              </label>
              <select
                value={formData.parent_name}
                onChange={handleParentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                disabled={isSubmitting}
              >
                <option value="">Aucune (catégorie principale)</option>
                {parentCategories.map(cat => (
                  <option key={cat.id} value={cat.nom}>
                    {cat.nom}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Sélectionnez une catégorie parent pour créer une sous-catégorie
              </p>
            </div>
          </div>

          {/* Section des sous-catégories (uniquement pour les catégories principales) */}
          {!formData.parent_id && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hiérarchie des sous-catégories
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Créez une hiérarchie complète : Catégorie → Sous-catégorie → Sous-sous-catégorie
              </p>
              
              {/* Ajout de sous-catégorie */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newSubMarque}
                  onChange={(e) => setNewSubMarque(e.target.value)}
                  placeholder="Nom de la sous-catégorie"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  disabled={isSubmitting}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSubMarque();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addSubMarque}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  disabled={isSubmitting || !newSubMarque.trim()}
                >
                  Ajouter sous-catégorie
                </button>
              </div>
              
              {/* Liste des sous-catégories avec leurs sous-sous-catégories */}
              <div className="space-y-4">
                {formData.subCategories.map((sub, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        📁 {sub}
                        <button
                          type="button"
                          onClick={() => removeSubMarque(index)}
                          className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-300 font-semibold"
                          disabled={isSubmitting}
                        >
                          ×
                        </button>
                      </span>
                    </div>
                    
                    <SubSubMarqueInput parentSubMarque={sub} />
                  </div>
                ))}
              </div>
              
              {formData.subCategories.length === 0 && (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                    Aucune sous-catégorie ajoutée
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Ajoutez des sous-catégories pour créer une hiérarchie
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Informations de la catégorie existante */}
          {Marque && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Informations de la catégorie
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>ID: {Marque.id}</p>
                {Marque.dateCreation && <p>Créée le: {Marque.dateCreation}</p>}
                {Marque.subCategories && Marque.subCategories.length > 0 && (
                  <p>Sous-catégories actuelles: {Marque.subCategories.length}</p>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-8 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {Marque ? 'Modification...' : 'Création...'}
                </span>
              ) : (
                Marque ? 'Modifier' : 'Créer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarqueModal;