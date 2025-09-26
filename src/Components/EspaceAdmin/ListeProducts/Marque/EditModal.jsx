import React, { useState, useEffect } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

const EditModal = ({ marque, onSave, onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    site: '',
    logo: null,
    status: 'active'
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');

  useEffect(() => {
    console.log('EditModal useEffect - marque data:', marque);
    
    if (marque && isOpen) {
      setFormData({
        nom: marque.nom || '',
        description: marque.description || '',
        site: marque.site || '',
        logo: null, 
        status: marque.status || 'active'
      });
      setLogoPreview(marque.logo_url || marque.logo || '');
      console.log('Form data set to:', {
        nom: marque.nom,
        description: marque.description,
        site: marque.site,
        status: marque.status
      });
    }
    setErrors({});
  }, [marque, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom de la marque est obligatoire';
    }
    
    if (formData.site && !isValidUrl(formData.site)) {
      newErrors.site = 'Veuillez entrer une URL valide (ex: https://www.exemple.com)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    const submitData = new FormData();
    
    submitData.append('nom', formData.nom.trim());
    submitData.append('description', formData.description || '');
    submitData.append('site', formData.site || '');
    submitData.append('status', formData.status);
    
    if (formData.logo) {
      submitData.append('logo', formData.logo);
    }

    console.log('FormData contents:');
    for (let [key, value] of submitData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log('Submitting form with marque ID:', marque.id);

    const result = await onSave(marque.id, submitData);
    
    console.log('Save result:', result); 
    
    if (result && result.success) {
      console.log('Edit successful, closing modal');
      onClose();
    } else {
      console.error('Edit failed:', result);
      if (result && result.error) {
        alert('Erreur lors de la modification: ' + result.error);
      }
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    alert('Erreur lors de la modification: ' + error.message);
  } finally {
    setIsLoading(false);
  }
};

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const removeLogo = () => {
    setFormData(prev => ({
      ...prev,
      logo: null
    }));
    setLogoPreview('');
  };

  if (!isOpen) return null;

  console.log('Rendering EditModal with marque:', marque);
  console.log('Current formData:', formData);

  return (
    <div 
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Modifier la marque: {marque?.nom}
          </h3>
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                Nom de la marque <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
                  errors.nom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Apple, Nike, Samsung..."
                disabled={isLoading}
              />
              {errors.nom && (
                <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
              )}
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                disabled={isLoading}
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="site" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                Site Web
              </label>
              <input
                type="url"
                id="site"
                name="site"
                value={formData.site}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
                  errors.site ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://www.exemple.com"
                disabled={isLoading}
              />
              {errors.site && (
                <p className="mt-1 text-sm text-red-600">{errors.site}</p>
              )}
            </div>

            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                Nouveau Logo (Fichier)
              </label>
              <input
                type="file"
                id="logo"
                name="logo"
                onChange={handleInputChange}
                accept="image/*"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                  errors.logo ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.logo && (
                <p className="mt-1 text-sm text-red-600">{errors.logo}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
              Logo actuel
            </label>
            <div className="flex items-center space-x-4">
              {logoPreview ? (
                <>
                  <img
                    src={logoPreview}
                    alt="Logo actuel"
                    className="h-16 w-16 rounded object-contain border border-gray-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="h-16 w-16 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center" style={{display: 'none'}}>
                    <PhotoIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </>
              ) : (
                <div className="h-16 w-16 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                  <span className="text-xs text-gray-500 ml-1">Aucun logo</span>
                </div>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              placeholder="Décrivez brièvement la marque..."
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mise à jour...
                </span>
              ) : (
                'Modifier'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;