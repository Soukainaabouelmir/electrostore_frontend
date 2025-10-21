import React, { useState, useEffect } from 'react';
import { XMarkIcon, PhotoIcon, PlusIcon, ArrowUpTrayIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const ActionChoiceModal = ({ isOpen, onClose, onAddProduct, onImportProducts }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Gestion des produits
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={onAddProduct}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <PlusIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Ajouter un produit
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Créer un nouveau produit manuellement
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={onImportProducts}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex  items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <ArrowUpTrayIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Importer les produits
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Importer plusieurs produits via un fichier Excel
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-800"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsModal = ({ marques, onSave, onClose, isOpen }) => {
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
    if (marques) {
      setFormData({
        nom: marques.nom || '',
        description: marques.description || '',
        site: marques.site || '',
        logo: null,
        status: marques.status || 'active'
      });
      setLogoPreview(marques.logo || '');
    } else {
      setFormData({
        nom: '',
        description: '',
        site: '',
        logo: null,
        status: 'active'
      });
      setLogoPreview('');
    }
    setErrors({});
  }, [marques, isOpen]);

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
      } else {
        setLogoPreview('');
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
      submitData.append('nom', formData.nom);
      submitData.append('description', formData.description || '');
      submitData.append('site', formData.site || '');
      submitData.append('status', formData.status);
      
      if (formData.logo) {
        submitData.append('logo', formData.logo);
      }

      const result = await onSave(submitData);
      if (result && result.success) {
        onClose();
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {marques ? 'Modifier la marque' : 'Ajouter une nouvelle marque'}
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

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              <label htmlFor="site" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo (Fichier)
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

          {logoPreview && (
            <div className="mb-6 flex items-center space-x-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">Aperçu:</span>
              <div className="flex items-center">
                <img
                  src={logoPreview}
                  alt="Aperçu du logo"
                  className="h-16 w-16 rounded object-contain border border-gray-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="h-16 w-16 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center" style={{display: 'none'}}>
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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

          {/* Boutons */}
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
                  Sauvegarde...
                </span>
              ) : (
                marques ? 'Modifier' : 'Ajouter'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductsModalManager = ({ marques, onSave, onClose, isOpen }) => {
  const [currentModal, setCurrentModal] = useState('choice'); 
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentModal('choice');
      setShowImportModal(false);
    }
  }, [isOpen]);

  const handleAddProduct = () => {
    setCurrentModal('add');
  };

  const handleImportProducts = () => {
    setCurrentModal('import');
    setShowImportModal(true);
  };

  const handleCloseImportModal = () => {
    setShowImportModal(false);
    setCurrentModal('choice');
  };

  const handleCloseAll = () => {
    setCurrentModal('choice');
    onClose();
  };

  const handleSaveProduct = async (data) => {
    const result = await onSave(data);
    if (result && result.success) {
      setCurrentModal('choice');
    }
    return result;
  };



const ImportModal = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImportResult(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
      ];
      
      if (validTypes.includes(droppedFile.type)) {
        setFile(droppedFile);
        setImportResult(null);
      } else {
        alert('Type de fichier non supporté. Veuillez utiliser Excel ou CSV.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setImportResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/products/import', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      setImportResult(result);
      
      if (result.success) {
        setTimeout(() => {
          onSuccess && onSuccess();
          handleCloseModal();
        }, 3000);
      }
    } catch (error) {
      setImportResult({
        success: false,
        message: 'Erreur de connexion au serveur',
        errors: [error.message]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products/template');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `template_produits_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Erreur lors du téléchargement du template');
    }
  };

  const handleCloseModal = () => {
    setFile(null);
    setImportResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Importer les produits
          </h3>
          <button
            type="button"
            onClick={handleCloseModal}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Bouton de téléchargement du template */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <ArrowDownTrayIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200">
                  Besoin d'un template ?
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Téléchargez notre fichier modèle pour voir le format requis
                </p>
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  Télécharger le template Excel
                </button>
              </div>
            </div>
          </div>

          {/* Zone de drag and drop */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fichier à importer
            </label>
            
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                disabled={isLoading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              
              <ArrowDownTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
              
              {file ? (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-blue-600 dark:text-blue-400">Cliquez pour sélectionner</span>
                    {' '}ou glissez-déposez un fichier
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Excel (.xlsx, .xls) ou CSV jusqu'à 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Résultat de l'importation */}
          {importResult && (
            <div className={`mb-6 p-4 rounded-lg border ${
              importResult.success 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
            }`}>
              <div className="flex items-start space-x-3">
                {importResult.success ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                ) : (
                  <ExclamationCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${
                    importResult.success 
                      ? 'text-green-900 dark:text-green-200' 
                      : 'text-red-900 dark:text-red-200'
                  }`}>
                    {importResult.message}
                  </h4>
                  
                  {importResult.imported > 0 && (
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      {importResult.imported} / {importResult.total_rows} produit(s) importé(s)
                    </p>
                  )}
                  
                  {importResult.errors && importResult.errors.length > 0 && (
                    <div className="mt-3 max-h-32 overflow-y-auto">
                      <p className="text-xs font-medium text-red-800 dark:text-red-300 mb-1">
                        Erreurs détectées:
                      </p>
                      <ul className="text-xs text-red-700 dark:text-red-300 space-y-1">
                        {importResult.errors.slice(0, 5).map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                        {importResult.errors.length > 5 && (
                          <li className="font-medium">
                            ... et {importResult.errors.length - 5} autre(s) erreur(s)
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-2">Format du fichier Excel:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>La première ligne doit contenir les en-têtes des colonnes</li>
              <li>Colonnes requises: <span className="font-medium">nom, prix, categorie</span></li>
              <li>Colonnes optionnelles: description, marque, image_url, processeur, ram, etc.</li>
              <li>Si la marque n'existe pas, elle sera créée automatiquement</li>
            </ul>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCloseModal}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!file || isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Import en cours...
                </span>
              ) : (
                'Importer les produits'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


  return (
    <>
      <ActionChoiceModal
        isOpen={isOpen && currentModal === 'choice'}
        onClose={handleCloseAll}
        onAddProduct={handleAddProduct}
        onImportProducts={handleImportProducts}
      />
      
      <ProductsModal
        marques={marques}
        onSave={handleSaveProduct}
        onClose={() => setCurrentModal('choice')}
        isOpen={isOpen && currentModal === 'add'}
      />
      
      <ImportModal
        isOpen={isOpen && currentModal === 'import'}
        onClose={handleCloseImportModal}
        onImport={handleImportProducts}
      />
    </>
  );
};

export default ProductsModalManager;