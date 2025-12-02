import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Package, Cpu, Monitor, HardDrive, 
  MemoryStick, Zap, Motherboard, Headphones, 
  Settings, DollarSign, Tag, Image,
  PackageOpen, Shield, TrendingUp, Radio,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const ProductsModal = ({ isOpen, onClose, onProductAdded, token }) => {
  const [formData, setFormData] = useState({
    // Champs communs
    nom: '',
    description: '',
    description_detail: '',
    caracteristique_principale: '',
    prix: '',
    prix_original: '',
    image_url: '',
    id_marque: '',
    categorie: '',
    sous_categorie: '',
    promotion: false,
    in_stock: true,
    quantity: 0,
    garantie: '',
    disponibilite: 'stock',
    
    // Champs spécifiques
    processeur: '',
    carte_graphique: '',
    ram: '',
    stockage: '',
    performance: '',
    type_composant: '',
    socket: '',
    compatibilite_cpu: '',
    chipset: '',
    format_carte_mere: '',
    puissance_watts: ''
  });

  const [errors, setErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [marques, setMarques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // STRUCTURE ALIGNÉE AVEC LA NAVBAR
  const categories = [
    { 
      id: 'ordinateurs', 
      label: 'Ordinateurs', 
      icon: <Monitor className="w-5 h-5" />,
      sous_categories: [
        { 
          id: 'pc_gamer', 
          label: 'PC Gamer',
          fields: ['processeur', 'carte_graphique', 'ram', 'stockage', 'performance']
        },
        { 
          id: 'pc_bureau', 
          label: 'PC Bureau',
          fields: ['processeur', 'carte_graphique', 'ram', 'stockage']
        },
        { 
          id: 'pc_portable', 
          label: 'PC Portable',
          fields: ['processeur', 'carte_graphique', 'ram', 'stockage']
        },
        { 
          id: 'pc_ultrabook', 
          label: 'PC Ultrabook',
          fields: ['processeur', 'carte_graphique', 'ram', 'stockage']
        },
        { 
          id: 'pc_reconditionnes', 
          label: 'PC Reconditionnés',
          fields: ['processeur', 'carte_graphique', 'ram', 'stockage']
        }
      ]
    },
    { 
      id: 'composants', 
      label: 'Composants', 
      icon: <Cpu className="w-5 h-5" />,
      sous_categories: [
        { 
          id: 'processeurs', 
          label: 'Processeurs',
          fields: ['type_composant', 'socket', 'compatibilite_cpu']
        },
        { 
          id: 'cartes_graphiques', 
          label: 'Cartes Graphiques',
          fields: ['type_composant']
        },
        { 
          id: 'memoire_ram', 
          label: 'Mémoire RAM',
          fields: ['type_composant']
        },
        { 
          id: 'cartes_meres', 
          label: 'Cartes Mères',
          fields: ['socket', 'chipset', 'format_carte_mere', 'compatibilite_cpu']
        },
        { 
          id: 'stockage', 
          label: 'Stockage SSD/HDD',
          fields: ['type_composant']
        },
        { 
          id: 'alimentations', 
          label: 'Alimentations',
          fields: ['type_composant', 'puissance_watts']
        }
      ]
    },
    { 
      id: 'peripheriques', 
      label: 'Périphériques', 
      icon: <Settings className="w-5 h-5" />,
      sous_categories: [
        { 
          id: 'ecrans', 
          label: 'Écrans',
          fields: []
        },
        { 
          id: 'claviers', 
          label: 'Claviers',
          fields: []
        },
        { 
          id: 'souris', 
          label: 'Souris',
          fields: []
        },
        { 
          id: 'casques', 
          label: 'Casques',
          fields: []
        },
        { 
          id: 'haut_parleurs', 
          label: 'Haut-parleurs',
          fields: []
        },
        { 
          id: 'webcams', 
          label: 'Webcams',
          fields: []
        }
      ]
    },
    { 
      id: 'gaming', 
      label: 'Gaming', 
      icon: <Headphones className="w-5 h-5" />,
      sous_categories: [
        { 
          id: 'casques_gaming', 
          label: 'Casques Gaming',
          fields: []
        },
        { 
          id: 'claviers_gaming', 
          label: 'Claviers Gaming',
          fields: []
        },
        { 
          id: 'souris_gaming', 
          label: 'Souris Gaming',
          fields: []
        },
        { 
          id: 'tapis_souris', 
          label: 'Tapis de souris',
          fields: []
        },
        { 
          id: 'manettes', 
          label: 'Manettes',
          fields: []
        },
        { 
          id: 'chaises_gaming', 
          label: 'Chaises Gaming',
          fields: []
        }
      ]
    },
    { 
      id: 'services', 
      label: 'Services', 
      icon: <Zap className="w-5 h-5" />,
      sous_categories: [
        { 
          id: 'assemblage', 
          label: 'Assemblage sur mesure',
          fields: []
        },
        { 
          id: 'maintenance', 
          label: 'Maintenance',
          fields: []
        },
        { 
          id: 'upgrade', 
          label: 'Upgrade',
          fields: []
        },
        { 
          id: 'support', 
          label: 'Support technique',
          fields: []
        },
        { 
          id: 'garantie_etendue', 
          label: 'Garantie étendue',
          fields: []
        }
      ]
    }
  ];

  // Options pour les select
  const socketOptions = [
    'LGA1700', 'LGA1200', 'LGA1151', 'AM5', 'AM4', 'TR4', 'sWRX8'
  ];

  const formatCarteMereOptions = [
    'ATX', 'Micro-ATX', 'Mini-ITX', 'E-ATX'
  ];

  const chipsetOptions = [
    'Z790', 'B760', 'H770', 'Z690', 'B660',
    'X670E', 'X670', 'B650E', 'B650', 'A620'
  ];

  const performanceOptions = [
    'Entrée de gamme',
    'Milieu de gamme', 
    'Haut de gamme',
    'Ultra performance'
  ];

  const disponibiliteOptions = [
    { value: 'stock', label: 'En stock', icon: '✅' },
    { value: 'precommande', label: 'Précommande', icon: '📅' },
    { value: 'rupture', label: 'Rupture de stock', icon: '⛔' },
    { value: 'soon', label: 'Bientôt disponible', icon: '⏳' }
  ];

  const garantieOptions = [
    '1 an', '2 ans', '3 ans', '5 ans', '10 ans', 'À vie'
  ];

  const typeComposantOptions = {
    'processeurs': [
      'Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9',
      'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'
    ],
    'cartes_graphiques': [
      'NVIDIA GeForce RTX 40xx', 'NVIDIA GeForce RTX 30xx',
      'AMD Radeon RX 7000', 'AMD Radeon RX 6000', 'Intel Arc'
    ],
    'memoire_ram': ['DDR5', 'DDR4', 'DDR3'],
    'stockage': [
      'SSD NVMe', 'SSD SATA', 'HDD SATA',
      'SSD M.2', 'SSD PCIe'
    ],
    'alimentations': [
      '80 Plus Titanium', '80 Plus Platinum', '80 Plus Gold',
      '80 Plus Bronze', '80 Plus'
    ]
  };

  useEffect(() => {
    if (isOpen) {
      fetchMarques();
    }
  }, [isOpen]);

 const fetchMarques = async () => {
  try {
    setLoading(true);
    setApiError('');
    
    const response = await fetch('http://localhost:8000/api/admin/marques', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Important pour les cookies/sessions
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      setMarques(data.data);
    } else {
      setApiError(data.message || 'Erreur lors du chargement des marques');
    }
  } catch (error) {
    console.error('Erreur API marques:', error);
    setApiError(error.message || 'Erreur de connexion au serveur');
  } finally {
    setLoading(false);
  }
};


  const resetForm = () => {
    setFormData({
      nom: '',
      description: '',
      description_detail: '',
      caracteristique_principale: '',
      prix: '',
      prix_original: '',
      image_url: '',
      id_marque: '',
      categorie: '',
      sous_categorie: '',
      promotion: false,
      in_stock: true,
      quantity: 0,
      garantie: '',
      disponibilite: 'stock',
      processeur: '',
      carte_graphique: '',
      ram: '',
      stockage: '',
      performance: '',
      type_composant: '',
      socket: '',
      compatibilite_cpu: '',
      chipset: '',
      format_carte_mere: '',
      puissance_watts: ''
    });
    setSelectedCategory('');
    setSelectedSubCategory('');
    setErrors({});
    setApiError('');
    setSuccessMessage('');
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'categorie') {
      setSelectedCategory(value);
      setSelectedSubCategory('');
      setFormData(prev => ({
        ...prev,
        [name]: value,
        sous_categorie: '',
        // Reset des champs spécifiques
        processeur: '',
        carte_graphique: '',
        ram: '',
        stockage: '',
        performance: '',
        type_composant: '',
        socket: '',
        compatibilite_cpu: '',
        chipset: '',
        format_carte_mere: '',
        puissance_watts: ''
      }));
    } else if (name === 'sous_categorie') {
      setSelectedSubCategory(value);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        // Reset des champs spécifiques
        processeur: '',
        carte_graphique: '',
        ram: '',
        stockage: '',
        performance: '',
        type_composant: '',
        socket: '',
        compatibilite_cpu: '',
        chipset: '',
        format_carte_mere: '',
        puissance_watts: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validation des champs communs
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prix || parseFloat(formData.prix) <= 0) newErrors.prix = 'Prix invalide';
    if (!formData.categorie) newErrors.categorie = 'Catégorie requise';
    if (!formData.sous_categorie) newErrors.sous_categorie = 'Sous-catégorie requise';
    if (!formData.id_marque) newErrors.id_marque = 'Marque requise';
    
    // Trouver la sous-catégorie sélectionnée et ses champs requis
    const currentCategory = categories.find(cat => cat.id === formData.categorie);
    if (currentCategory) {
      const currentSubCategory = currentCategory.sous_categories.find(
        sub => sub.id === formData.sous_categorie
      );
      if (currentSubCategory) {
        currentSubCategory.fields.forEach(field => {
          if (!formData[field]) {
            newErrors[field] = 'Ce champ est requis';
          }
        });
      }
    }
    
    if (formData.promotion && (!formData.prix_original || parseFloat(formData.prix_original) <= parseFloat(formData.prix))) {
      newErrors.prix_original = 'Le prix original doit être supérieur au prix promotionnel';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  try {
    setLoading(true);
    setApiError('');
    setSuccessMessage('');

    // Préparation des données
    const productData = {
      ...formData,
      prix: parseFloat(formData.prix),
      prix_original: formData.prix_original ? parseFloat(formData.prix_original) : null,
      quantity: parseInt(formData.quantity) || 0,
      puissance_watts: formData.puissance_watts ? parseInt(formData.puissance_watts) : null,
      promotion: formData.promotion || false,
      in_stock: formData.in_stock || true,
      id_marque: parseInt(formData.id_marque)
    };

    // Appel API
    const response = await fetch('http://localhost:8000/api/admin/products/store', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData),
      credentials: 'include' // Important pour les cookies/sessions
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 422) {
        // Erreurs de validation Laravel
        const validationErrors = data.errors;
        const formattedErrors = {};
        
        Object.keys(validationErrors).forEach(key => {
          formattedErrors[key] = validationErrors[key][0];
        });
        
        setErrors(formattedErrors);
        setApiError('Veuillez corriger les erreurs dans le formulaire');
      } else {
        setApiError(data.message || `Erreur: ${response.statusText}`);
      }
      return;
    }

    if (data.success) {
      setSuccessMessage('Produit créé avec succès!');
      
      if (onProductAdded) {
        onProductAdded(data.data);
      }
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setApiError(data.message || 'Erreur lors de la création du produit');
    }

  } catch (error) {
    console.error('Erreur:', error);
    
    // Gestion spécifique pour localhost HTTPS (certificat auto-signé)
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      setApiError('Erreur de connexion. Vérifiez que le serveur Laravel est démarré sur http://localhost:8000');
    } else {
      setApiError('Erreur de connexion au serveur');
    }
  } finally {
    setLoading(false);
  }
};


  // Rendu des champs spécifiques
  const renderSpecificFields = () => {
    if (!selectedSubCategory) return null;

    const currentCategory = categories.find(cat => cat.id === selectedCategory);
    if (!currentCategory) return null;

    const currentSubCategory = currentCategory.sous_categories.find(
      sub => sub.id === selectedSubCategory
    );
    if (!currentSubCategory) return null;

    const requiredFields = currentSubCategory.fields || [];

    if (requiredFields.length === 0) return null;

    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Spécifications techniques
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requiredFields.includes('processeur') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Processeur *
              </label>
              <input
                type="text"
                name="processeur"
                value={formData.processeur}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.processeur ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Ex: Intel Core i9-13900K"
              />
              {errors.processeur && <p className="text-red-500 text-sm mt-1">{errors.processeur}</p>}
            </div>
          )}

          {requiredFields.includes('carte_graphique') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carte Graphique *
              </label>
              <input
                type="text"
                name="carte_graphique"
                value={formData.carte_graphique}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.carte_graphique ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Ex: NVIDIA RTX 4090 24GB"
              />
              {errors.carte_graphique && <p className="text-red-500 text-sm mt-1">{errors.carte_graphique}</p>}
            </div>
          )}

          {requiredFields.includes('ram') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mémoire RAM *
              </label>
              <input
                type="text"
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.ram ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Ex: 32GB DDR5 6000MHz"
              />
              {errors.ram && <p className="text-red-500 text-sm mt-1">{errors.ram}</p>}
            </div>
          )}

          {requiredFields.includes('stockage') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stockage *
              </label>
              <input
                type="text"
                name="stockage"
                value={formData.stockage}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.stockage ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Ex: 2TB NVMe SSD + 4TB HDD"
              />
              {errors.stockage && <p className="text-red-500 text-sm mt-1">{errors.stockage}</p>}
            </div>
          )}

          {requiredFields.includes('performance') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Niveau de performance *
              </label>
              <select
                name="performance"
                value={formData.performance}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.performance ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Sélectionner</option>
                {performanceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.performance && <p className="text-red-500 text-sm mt-1">{errors.performance}</p>}
            </div>
          )}

          {requiredFields.includes('type_composant') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type/Gamme *
              </label>
              <select
                name="type_composant"
                value={formData.type_composant}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.type_composant ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Sélectionner un type</option>
                {typeComposantOptions[selectedSubCategory]?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.type_composant && <p className="text-red-500 text-sm mt-1">{errors.type_composant}</p>}
            </div>
          )}

          {requiredFields.includes('socket') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Socket *
              </label>
              <select
                name="socket"
                value={formData.socket}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.socket ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Sélectionner un socket</option>
                {socketOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.socket && <p className="text-red-500 text-sm mt-1">{errors.socket}</p>}
            </div>
          )}

          {requiredFields.includes('compatibilite_cpu') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compatibilité CPU *
              </label>
              <select
                name="compatibilite_cpu"
                value={formData.compatibilite_cpu}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.compatibilite_cpu ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Sélectionner</option>
                <option value="Intel">Intel</option>
                <option value="AMD">AMD</option>
                <option value="Intel/AMD">Intel & AMD</option>
              </select>
              {errors.compatibilite_cpu && <p className="text-red-500 text-sm mt-1">{errors.compatibilite_cpu}</p>}
            </div>
          )}

          {requiredFields.includes('chipset') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chipset *
              </label>
              <select
                name="chipset"
                value={formData.chipset}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.chipset ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Sélectionner un chipset</option>
                {chipsetOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.chipset && <p className="text-red-500 text-sm mt-1">{errors.chipset}</p>}
            </div>
          )}

          {requiredFields.includes('format_carte_mere') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format *
              </label>
              <select
                name="format_carte_mere"
                value={formData.format_carte_mere}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.format_carte_mere ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Sélectionner un format</option>
                {formatCarteMereOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.format_carte_mere && <p className="text-red-500 text-sm mt-1">{errors.format_carte_mere}</p>}
            </div>
          )}

          {requiredFields.includes('puissance_watts') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puissance (Watts) *
              </label>
              <input
                type="number"
                name="puissance_watts"
                value={formData.puissance_watts}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.puissance_watts ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Ex: 850"
                min="0"
                step="50"
              />
              {errors.puissance_watts && <p className="text-red-500 text-sm mt-1">{errors.puissance_watts}</p>}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Ajouter un nouveau produit</h2>
              <p className="text-gray-600 text-sm">Sélectionnez la catégorie comme dans la navigation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Messages d'erreur/succès API */}
            {apiError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center text-red-700">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">{apiError}</span>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-700">
                  <span className="font-medium">{successMessage}</span>
                </div>
              </div>
            )}

            {/* Section Catégorie */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie principale *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(category => (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => handleChange({ target: { name: 'categorie', value: category.id } })}
                    disabled={loading}
                    className={`flex items-center p-4 border rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-100'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className={`mr-3 p-2 rounded-lg ${
                      selectedCategory === category.id ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {category.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{category.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.categorie && !selectedCategory && (
                <p className="text-red-500 text-sm mt-2">{errors.categorie}</p>
              )}
            </div>

            {/* Section Sous-catégorie */}
            {selectedCategory && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sous-catégorie *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories
                    .find(cat => cat.id === selectedCategory)
                    ?.sous_categories.map(subCat => (
                      <button
                        type="button"
                        key={subCat.id}
                        onClick={() => handleChange({ target: { name: 'sous_categorie', value: subCat.id } })}
                        disabled={loading}
                        className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-all ${
                          selectedSubCategory === subCat.id
                            ? 'border-green-500 bg-green-50 text-green-600 ring-1 ring-green-200'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <span className="text-sm font-medium text-center">{subCat.label}</span>
                      </button>
                    ))}
                </div>
                {errors.sous_categorie && !selectedSubCategory && (
                  <p className="text-red-500 text-sm mt-2">{errors.sous_categorie}</p>
                )}
              </div>
            )}

            {/* SECTION INFORMATIONS GÉNÉRALES (TOUJOURS VISIBLE) */}
            {(selectedCategory && selectedSubCategory) && (
              <>
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Informations générales
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Nom et Marque */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom du produit *
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          disabled={loading}
                          className={`w-full px-3 py-2 border rounded-lg ${errors.nom ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                          placeholder={`Ex: ${selectedSubCategory === 'processeurs' ? 'Intel Core i9-13900K' : 
                            selectedSubCategory === 'pc_gamer' ? 'PC Gamer Ultimate RTX 4090' :
                            selectedSubCategory === 'cartes_graphiques' ? 'NVIDIA RTX 4090 24GB' :
                            'Nom du produit'}`}
                        />
                        {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Marque *
                        </label>
                        {loading ? (
                          <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                            <div className="animate-pulse h-6 bg-gray-200 rounded"></div>
                          </div>
                        ) : (
                          <select
                            name="id_marque"
                            value={formData.id_marque}
                            onChange={handleChange}
                            disabled={loading}
                            className={`w-full px-3 py-2 border rounded-lg ${errors.id_marque ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                          >
                            <option value="">Sélectionner une marque</option>
                            {marques.map(marque => (
                              <option key={marque.id} value={marque.id}>{marque.nom}</option>
                            ))}
                          </select>
                        )}
                        {errors.id_marque && <p className="text-red-500 text-sm mt-1">{errors.id_marque}</p>}
                      </div>
                    </div>

                    {/* Prix et Promotion */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Prix (€) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          name="prix"
                          value={formData.prix}
                          onChange={handleChange}
                          disabled={loading}
                          className={`w-full px-3 py-2 border rounded-lg ${errors.prix ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                          placeholder="299.99"
                          min="0"
                        />
                        {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Promotion
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="promotion"
                            checked={formData.promotion}
                            onChange={handleChange}
                            disabled={loading}
                            className="rounded"
                            id="promotion"
                          />
                          <label htmlFor="promotion" className="text-sm text-gray-700">
                            Mettre en promotion
                          </label>
                        </div>
                        {formData.promotion && (
                          <>
                            <input
                              type="number"
                              step="0.01"
                              name="prix_original"
                              value={formData.prix_original}
                              onChange={handleChange}
                              disabled={loading}
                              className={`w-full mt-2 px-3 py-2 border rounded-lg ${errors.prix_original ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                              placeholder="Prix original (€)"
                              min="0"
                            />
                            {errors.prix_original && <p className="text-red-500 text-sm mt-1">{errors.prix_original}</p>}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Stock et Image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                          <PackageOpen className="w-4 h-4" />
                          Quantité en stock
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          disabled={loading}
                          className={`w-full px-3 py-2 border rounded-lg ${errors.quantity ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                          min="0"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                          <Image className="w-4 h-4" />
                          URL de l'image
                        </label>
                        <input
                          type="text"
                          name="image_url"
                          value={formData.image_url}
                          onChange={handleChange}
                          disabled={loading}
                          className={`w-full px-3 py-2 border rounded-lg ${errors.image_url ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                          placeholder="https://exemple.com/image.jpg"
                        />
                      </div>
                    </div>

                    {/* Garantie et Disponibilité */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Garantie
                        </label>
                        <select
                          name="garantie"
                          value={formData.garantie}
                          onChange={handleChange}
                          disabled={loading}
                          className={`w-full px-3 py-2 border rounded-lg ${errors.garantie ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                        >
                          <option value="">Sans garantie</option>
                          {garantieOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Disponibilité
                        </label>
                        <select
                          name="disponibilite"
                          value={formData.disponibilite}
                          onChange={handleChange}
                          disabled={loading}
                          className={`w-full px-3 py-2 border rounded-lg ${errors.disponibilite ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                        >
                          {disponibiliteOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.icon} {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Description courte */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description courte
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={loading}
                        rows="2"
                        className={`w-full px-3 py-2 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                        placeholder="Description succincte du produit"
                      />
                    </div>

                    {/* Description détaillée */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description détaillée
                      </label>
                      <textarea
                        name="description_detail"
                        value={formData.description_detail}
                        onChange={handleChange}
                        disabled={loading}
                        rows="3"
                        className={`w-full px-3 py-2 border rounded-lg ${errors.description_detail ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                        placeholder="Description complète avec toutes les caractéristiques techniques..."
                      />
                    </div>

                    {/* Caractéristiques principales */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Caractéristiques principales <span className='text-xs text-gray-600'> (Séparées par des virgules) </span> 
                      </label>
                      <textarea
                        name="caracteristique_principale"
                        value={formData.caracteristique_principale}
                        onChange={handleChange}
                        disabled={loading}
                        rows="3"
                        className={`w-full px-3 py-2 border rounded-lg ${errors.caracteristique_principale ? 'border-red-500' : 'border-gray-300'} ${loading ? 'bg-gray-50' : ''}`}
                        placeholder="Ex: Intel Core i9, 32GB RAM, RTX 4090, Écran 4K..."
                      />
                    </div>

                    {/* Disponible à la vente */}
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        name="in_stock"
                        checked={formData.in_stock}
                        onChange={handleChange}
                        disabled={loading}
                        className="rounded"
                        id="in_stock"
                      />
                      <label htmlFor="in_stock" className="text-sm font-medium text-gray-700">
                        Produit disponible à la vente
                      </label>
                    </div>
                  </div>
                </div>

                {/* SECTION CHAMPS SPÉCIFIQUES */}
                {renderSpecificFields()}
              </>
            )}

            {/* Message si aucune catégorie sélectionnée */}
            {(!selectedCategory || !selectedSubCategory) && (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Sélectionnez une catégorie et une sous-catégorie</p>
                <p className="text-sm mt-2">Les champs du formulaire apparaîtront après la sélection</p>
              </div>
            )}
          </div>

          {/* BOUTONS DE SOUMISSION (visibles seulement si catégorie sélectionnée) */}
          {(selectedCategory && selectedSubCategory) && (
            <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Création en cours...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Ajouter le produit</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductsModal;