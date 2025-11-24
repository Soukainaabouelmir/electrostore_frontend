import React, { useState } from 'react';
import { X, Plus, Package, Cpu, Monitor, Keyboard, Coffee,Zap } from 'lucide-react';

const ProductsModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    prix_original: '',
    image_url: '',
    id_marque: '',
    categorie: '',
    sous_categorie: '',
    type_composant: '',
    quantity: 0,
    in_stock: true,
    promotion: false,
    garantie: '1 an',
    description_detail: '',
    caracteristique_principale: '',
    
    // Champs PC complets
    processeur: '',
    carte_graphique: '',
    ram: '',
    stockage: '',
    performance: '',
    
    // Champs composants compatibilité
    socket: '',
    compatibilite_cpu: '',
    chipset: '',
    format_carte_mere: '',
    puissance_watts: ''
  });

  const marques = [
    { id: 1, nom: 'ASUS' },
    { id: 2, nom: 'MSI' },
    { id: 3, nom: 'Dell' },
    { id: 4, nom: 'HP' },
    { id: 5, nom: 'Lenovo' },
    { id: 6, nom: 'Intel' },
    { id: 7, nom: 'AMD' },
    { id: 8, nom: 'NVIDIA' },
    { id: 9, nom: 'Corsair' },
    { id: 10, nom: 'Kingston' },
    { id: 11, nom: 'Logitech' },
    { id: 12, nom: 'Razer' },
    { id: 13, nom: 'IKEA' },
    { id: 14, nom: 'Herman Miller' }
  ];

  const categories = [
    { value: 'ordinateurs', label: 'Ordinateurs Complets', icon: Monitor },
    { value: 'composants', label: 'Composants PC', icon: Cpu },
    { value: 'peripheriques', label: 'Périphériques', icon: Keyboard },
    { value: 'accessoires', label: 'Accessoires', icon: Package },
    { value: 'mobilier', label: 'Mobilier Bureau', icon: Coffee }
  ];

  const sousCategories = {
    ordinateurs: [
      { value: 'pc-gamer', label: 'PC Gamer' },
      { value: 'pc-bureau', label: 'PC Bureau' },
      { value: 'laptop', label: 'Laptop' },
      { value: 'workstation', label: 'Workstation' }
    ],
    composants: [
      { value: 'processeur', label: 'Processeur' },
      { value: 'carte-graphique', label: 'Carte Graphique' },
      { value: 'carte-mere', label: 'Carte Mère' },
      { value: 'ram', label: 'Mémoire RAM' },
      { value: 'stockage', label: 'Stockage' },
      { value: 'alimentation', label: 'Alimentation' },
      { value: 'boitier', label: 'Boîtier' },
      { value: 'refroidissement', label: 'Refroidissement' }
    ],
    peripheriques: [
      { value: 'clavier', label: 'Clavier' },
      { value: 'souris', label: 'Souris' },
      { value: 'ecran', label: 'Écran' },
      { value: 'casque', label: 'Casque' },
      { value: 'webcam', label: 'Webcam' },
      { value: 'enceintes', label: 'Enceintes' }
    ],
    accessoires: [
      { value: 'cable', label: 'Câbles' },
      { value: 'hub', label: 'Hub USB' },
      { value: 'support', label: 'Support' },
      { value: 'tapis-souris', label: 'Tapis de souris' },
      { value: 'rangement', label: 'Rangement' }
    ],
    mobilier: [
      { value: 'bureau', label: 'Bureau' },
      { value: 'chaise', label: 'Chaise' },
      { value: 'support-ecran', label: 'Support écran' },
      { value: 'lampe', label: 'Lampe' },
      { value: 'etagere', label: 'Étagère' }
    ]
  };

  // 🎯 LOGIQUE INTELLIGENTE : Détermine quels champs afficher
  const getVisibleFields = () => {
    const { categorie, sous_categorie } = formData;
    
    return {
      // PC complets : afficher specs complètes
      showPCSpecs: categorie === 'ordinateurs',
      
      // Composants PC : afficher champs de compatibilité
      showProcessorFields: categorie === 'composants' && sous_categorie === 'processeur',
      showGPUFields: categorie === 'composants' && sous_categorie === 'carte-graphique',
      showMotherboardFields: categorie === 'composants' && sous_categorie === 'carte-mere',
      showRAMFields: categorie === 'composants' && sous_categorie === 'ram',
      showStorageFields: categorie === 'composants' && sous_categorie === 'stockage',
      showPowerSupplyFields: categorie === 'composants' && sous_categorie === 'alimentation',
      
      // Produits standards : pas de champs techniques
      isStandardProduct: ['peripheriques', 'accessoires', 'mobilier'].includes(categorie)
    };
  };

  const visibleFields = getVisibleFields();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Réinitialiser la sous-catégorie si la catégorie change
    if (name === 'categorie') {
      setFormData(prev => ({ ...prev, sous_categorie: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Nettoyer les champs non utilisés selon le type de produit
    const cleanedData = { ...formData };
    
    // Si produit standard (non-PC), supprimer tous les champs techniques
    if (visibleFields.isStandardProduct) {
      delete cleanedData.processeur;
      delete cleanedData.carte_graphique;
      delete cleanedData.ram;
      delete cleanedData.stockage;
      delete cleanedData.performance;
      delete cleanedData.socket;
      delete cleanedData.compatibilite_cpu;
      delete cleanedData.chipset;
      delete cleanedData.format_carte_mere;
      delete cleanedData.puissance_watts;
    } else {
      // Pour PC et composants, nettoyer selon les champs visibles
      if (!visibleFields.showPCSpecs) {
        delete cleanedData.processeur;
        delete cleanedData.carte_graphique;
        delete cleanedData.ram;
        delete cleanedData.stockage;
        delete cleanedData.performance;
      }
      
      if (!visibleFields.showMotherboardFields && !visibleFields.showProcessorFields) {
        delete cleanedData.socket;
      }
      
      if (!visibleFields.showMotherboardFields) {
        delete cleanedData.compatibilite_cpu;
        delete cleanedData.chipset;
        delete cleanedData.format_carte_mere;
      }
      
      if (!visibleFields.showPowerSupplyFields) {
        delete cleanedData.puissance_watts;
      }
    }

    onSubmit(cleanedData);
  };

  const handleReset = () => {
    setFormData({
      nom: '',
      description: '',
      prix: '',
      prix_original: '',
      image_url: '',
      id_marque: '',
      categorie: '',
      sous_categorie: '',
      type_composant: '',
      quantity: 0,
      in_stock: true,
      promotion: false,
      garantie: '1 an',
      description_detail: '',
      caracteristique_principale: '',
      processeur: '',
      carte_graphique: '',
      ram: '',
      stockage: '',
      performance: '',
      socket: '',
      compatibilite_cpu: '',
      chipset: '',
      format_carte_mere: '',
      puissance_watts: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Ajouter un Produit</h2>
            <p className="text-blue-100 text-sm">
              {visibleFields.isStandardProduct 
                ? '📦 Produit standard (mobilier, accessoires, périphériques)'
                : visibleFields.showPCSpecs 
                ? '💻 Ordinateur complet avec spécifications'
                : '🔧 Composant PC avec compatibilité'}
            </p>
          </div>
          <button onClick={onClose} className="hover:bg-blue-800 p-1 rounded">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            
            {/* Section: Informations de base */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations de base</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du produit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Bureau Gaming RGB, Chaise Ergonomique, Intel i7-13700K..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="categorie"
                    value={formData.categorie}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => {
                      const Icon = cat.icon;
                      return (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sous-catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sous_categorie"
                    value={formData.sous_categorie}
                    onChange={handleChange}
                    required
                    disabled={!formData.categorie}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">Sélectionner une sous-catégorie</option>
                    {formData.categorie && sousCategories[formData.categorie]?.map(subCat => (
                      <option key={subCat.value} value={subCat.value}>{subCat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marque <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="id_marque"
                    value={formData.id_marque}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner une marque</option>
                    {marques.map(marque => (
                      <option key={marque.id} value={marque.id}>{marque.nom}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL de l'image
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description courte
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Description courte du produit..."
                  />
                </div>
              </div>
            </div>

            {/* Section: Prix et stock */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Prix et Stock</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix actuel (MAD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="prix"
                    value={formData.prix}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="9999.99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix original (MAD)
                  </label>
                  <input
                    type="number"
                    name="prix_original"
                    value={formData.prix_original}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="11999.99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité en stock
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Garantie
                  </label>
                  <input
                    type="text"
                    name="garantie"
                    value={formData.garantie}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="1 an, 2 ans..."
                  />
                </div>

                <div className="flex items-center space-x-6 md:col-span-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="in_stock"
                      checked={formData.in_stock}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">En stock</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="promotion"
                      checked={formData.promotion}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">En promotion</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 💻 Section: Spécifications PC complets */}
            {visibleFields.showPCSpecs && (
              <div className="border-b pb-4 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <Monitor className="mr-2" size={20} />
                  Spécifications PC Complet
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Processeur
                    </label>
                    <input
                      type="text"
                      name="processeur"
                      value={formData.processeur}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      placeholder="Ex: Intel Core i7-12700H"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Carte Graphique
                    </label>
                    <input
                      type="text"
                      name="carte_graphique"
                      value={formData.carte_graphique}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      placeholder="Ex: NVIDIA RTX 4060"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      RAM
                    </label>
                    <input
                      type="text"
                      name="ram"
                      value={formData.ram}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      placeholder="Ex: 16GB DDR5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stockage
                    </label>
                    <input
                      type="text"
                      name="stockage"
                      value={formData.stockage}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      placeholder="Ex: 512GB NVMe SSD"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Performance / Usage
                    </label>
                    <input
                      type="text"
                      name="performance"
                      value={formData.performance}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      placeholder="Ex: Gaming, Workstation, Bureau..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 🔧 Section: Processeur */}
            {visibleFields.showProcessorFields && (
              <div className="border-b pb-4 bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                  <Cpu className="mr-2" size={20} />
                  Compatibilité Processeur
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Socket <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="socket"
                      value={formData.socket}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                      placeholder="Ex: LGA1700, AM5"
                    />
                    <p className="text-xs text-gray-500 mt-1">⚠️ Important pour la compatibilité carte mère</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type de composant
                    </label>
                    <input
                      type="text"
                      name="type_composant"
                      value={formData.type_composant}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                      placeholder="Ex: CPU Desktop, CPU Laptop"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 🔧 Section: Carte Mère */}
            {visibleFields.showMotherboardFields && (
              <div className="border-b pb-4 bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-4">
                  Compatibilité Carte Mère
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Socket <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="socket"
                      value={formData.socket}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
                      placeholder="Ex: LGA1700, AM5"
                    />
                    <p className="text-xs text-gray-500 mt-1">⚠️ Doit correspondre au socket CPU</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Compatibilité CPU
                    </label>
                    <input
                      type="text"
                      name="compatibilite_cpu"
                      value={formData.compatibilite_cpu}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
                      placeholder="Ex: Intel 12th/13th Gen, AMD Ryzen 7000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chipset
                    </label>
                    <input
                      type="text"
                      name="chipset"
                      value={formData.chipset}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
                      placeholder="Ex: Z790, B650, X670"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Format
                    </label>
                    <input
                      type="text"
                      name="format_carte_mere"
                      value={formData.format_carte_mere}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
                      placeholder="Ex: ATX, Micro-ATX, Mini-ITX"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ⚡ Section: Alimentation */}
            {visibleFields.showPowerSupplyFields && (
              <div className="border-b pb-4 bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                  <Zap className="mr-2" size={20} />
                  Spécifications Alimentation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Puissance (Watts) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="puissance_watts"
                      value={formData.puissance_watts}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"
                      placeholder="Ex: 750"
                    />
                    <p className="text-xs text-gray-500 mt-1">⚠️ Important pour calculer la puissance totale du PC</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type / Certification
                    </label>
                    <input
                      type="text"
                      name="type_composant"
                      value={formData.type_composant}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white"
                      placeholder="Ex: Modulaire 80+ Gold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section: Détails supplémentaires */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Détails supplémentaires</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Caractéristique principale
                  </label>
                  <input
                    type="text"
                    name="caracteristique_principale"
                    value={formData.caracteristique_principale}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Gaming haute performance, Ergonomique réglable..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description détaillée
                  </label>
                  <textarea
                    name="description_detail"
                    value={formData.description_detail}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Description complète du produit avec toutes les spécifications..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-3 border-t">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Réinitialiser
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Ajouter le produit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsModal;