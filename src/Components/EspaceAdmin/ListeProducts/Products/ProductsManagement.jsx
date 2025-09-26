import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableProducts from "./TableProducts";
import SearchAndFilterProducts from "./SearchAndFilterProducts/SearchAndFilterProducts";
import ProductsModal from "./ProductsModal";
import Pagination from "../../../Shared/Pagination";

const ProductsManagement = () => {
  const navigate = useNavigate();
  const [Products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPageProducts, setCurrentPageProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingproductes, setEditingproductes] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const API_BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "admin") {
      navigate("/compte");
      return;
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/admin/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const result = await response.json();

      console.log("API Response:", result);

      if (Array.isArray(result)) {
        const simpleProductes = result.map((products) => ({
          id: products.id,
          nom: products.nom,
          description: products.description || "",
          prix: products.prix || "",
          prix_original: products.prix_original || "",
          marque: products.marque || "",
          processeur: products.processeur || "",
          carte_graphique: products.carte_graphique || "",
          ram: products.ram || "",
          stockage: products.stockage || "",
          performance: products.performance || "",
          disponibilite: products.disponibilite || "",
          promotion: products.promotion || "",
          description_detail: products.description_detail || "",
          caracteristique_principale: products.caracteristique_principale || "",
          categorie: products.categorie || "",
          sous_categorie: products.sous_categorie || "",
          in_stock: products.in_stock || "",
          garantie: products.garantie || "",
        }));

        setProducts(simpleProductes);
        setFilteredProducts(simpleProductes);
      } else if (result.success) {
        const simpleProductes = result.data.map((products) => ({
          id: products.id,
          nom: products.nom,
          description: products.description || "",
          prix: products.prix || "",
          prix_original: products.prix_original || "",
          marque: products.marque || "",
          processeur: products.processeur || "",
          carte_graphique: products.carte_graphique || "",
          ram: products.ram || "",
          stockage: products.stockage || "",
          performance: products.performance || "",
          disponibilite: products.disponibilite || "",
          promotion: products.promotion || "",
          description_detail: products.description_detail || "",
          caracteristique_principale: products.caracteristique_principale || "",
          categorie: products.categorie || "",
          sous_categorie: products.sous_categorie || "",
          in_stock: products.in_stock || "",
          garantie: products.garantie || "",
          dateCreation:
            products.created_at || new Date().toISOString().split("T")[0],
        }));

        setProducts(simpleProductes);
        setFilteredProducts(simpleProductes);
      } else {
        throw new Error(
          result.message || "Erreur lors de la récupération des données"
        );
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des products:", err);
      setError(err.message);

      if (process.env.NODE_ENV === "development") {
        const mockProductes = [
          {
            id: 1,
            nom: "Falcon X15 Gamer",
            description: 'PC portable gaming 15,6" puissant et compact',
            prix: 1499.99,
            prix_original: 1799.99,
            marque: 6,
            processeur: "Intel Core i7-13700H",
            carte_graphique: "NVIDIA GeForce RTX 4070 8GB",
            ram: "16 GB DDR5",
            stockage: "1 TB NVMe SSD",
            performance: "Très élevée — conçu pour 1440p gaming et création",
            disponibilite: "En stock",
            promotion: "16% OFF",
            description_detail:
              "Le Falcon X15 allie puissance et portabilité : écran 165Hz, clavier rétroéclairé, système de refroidissement amélioré et connectivité complète (Wi‑Fi 6E, Thunderbolt 4). Idéal pour joueurs et créateurs.",
            caracteristique_principale:
              'Écran 15,6" 165Hz, RTX 4070, 16GB DDR5, 1TB NVMe',
            categorie: "Informatique",
            sous_categorie: "PC portable / Gaming",
            in_stock: true,
            garantie: "2 ans (constructeur)",
            dateCreation: "2025-06-10",
          },
        ];

        setProducts(mockProductes);
        setFilteredProducts(mockProductes);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (token && role === "admin") {
      fetchProducts();
    }

    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(Products);
    } else {
      const filtered = Products.filter(
        (products) =>
          products.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (products.description &&
            products.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (products.site &&
            products.site.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, Products]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentPageProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleEditFromActionButtons = async (products, formData) => {
    console.log("handleEditFromActionButtons called with:", products, formData);

    try {
      const url = `${API_BASE_URL}/admin/Productes/edit/${products.id}`;

      const headers = {
        Accept: "application/json",
      };

      const isFormData = formData instanceof FormData;
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: isFormData ? formData : JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      if (result.success) {
        await fetchProducts();
        return { success: true };
      } else {
        throw new Error(result.message || "Erreur lors de la sauvegarde");
      }
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const saveProductes = async (productesData, productsId = null) => {
    try {
      const isEditing = productsId || editingproductes;
      const finalId =
        productsId || (editingproductes ? editingproductes.id : null);

      const url = isEditing
        ? `${API_BASE_URL}/admin/productes/edit/${finalId}`
        : `${API_BASE_URL}/admin/productes/store`;

      const method = isEditing ? "PUT" : "POST";

      const isFormData = productesData instanceof FormData;

      const headers = {
        Accept: "application/json",
      };

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: isFormData ? productesData : JSON.stringify(productesData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      if (result.success) {
        await fetchProducts();
        return { success: true };
      } else {
        throw new Error(result.message || "Erreur lors de la sauvegarde");
      }
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const deleteproductes = async (productesId) => {
    try {
      setError(null); //  l'erreur avant la suppression

      const response = await fetch(
        `${API_BASE_URL}/admin/productes/delete/${productesId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      if (result.success) {
        // Recharger les données sans afficher d'erreur
        await fetchProducts();
        return { success: true };
      } else {
        throw new Error(result.message || "Erreur lors de la suppression");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);

      return { success: false, error: err.message };
    }
  };

  const handleAddproductes = () => {
    setEditingproductes(null);
    setShowModal(true);
  };

  const handleEditproductes = (productes) => {
    setEditingproductes(productes);
    setShowModal(true);
  };

  const handleDeleteproductes = async (productes) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette Products ?")) {
      setError(null);

      const result = await deleteproductes(productes.id);
      if (!result.success) {
        alert("Erreur lors de la suppression de la Products: " + result.error);
      } else {
        console.log("Products supprimée avec succès");
      }
    }
  };

  const handleSaveproductes = async (productesData) => {
    const result = await saveProductes(productesData);
    if (result.success) {
      setShowModal(false);
      setEditingproductes(null);
    } else {
      alert(`Erreur lors de la sauvegarde: ${result.error}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingproductes(null);
    setError(null);
  };

  const handleRefresh = () => {
    setError(null);
    fetchProducts();
  };

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || role !== "admin") {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Chargement des productes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Erreur: </strong>
              <span className="block sm:inline">{error}</span>
              <button
                onClick={() => setError(null)}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                <span className="sr-only">Fermer</span>
                &times;
              </button>
            </div>
          )}

          <SearchAndFilterProducts
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddNew={handleAddproductes}
            onRefresh={handleRefresh}
            currentViewData={currentPageProducts}
            allData={Products}
            totalCount={Products.length}
            filteredCount={filteredProducts.length}
          />

          <TableProducts
            Products={currentPageProducts}
            onEdit={handleEditproductes}
            onDelete={handleDeleteproductes}
            searchTerm={searchTerm}
          />

          <Pagination
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />

          {showModal && (
            <ProductsModal
              productes={editingproductes}
              Products={Products}
              onSave={handleSaveproductes}
              onClose={handleCloseModal}
              isOpen={showModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;
