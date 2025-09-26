import React, { useState } from 'react';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const ActionButtons = ({ Marque, onView, onEdit, onCopy, onDelete, onOpenAddModal }) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);

  const handleCopyClick = (e) => {
    e.stopPropagation();
    setCopyModalOpen(true);
  };

  const handleCopySubmit = (copiedMarqueData) => {
    if (onCopy) {
      onCopy(copiedMarqueData);
    }
    setCopyModalOpen(false);
  };
  
  const handleCopy = (e) => {
    e.stopPropagation(); // Prevent event propagation
    
    if (onOpenAddModal) {
      onOpenAddModal(Marque);
    } else if (onCopy) {
      onCopy(Marque);
    }
  };
  
  // Fonction corrigée pour gérer la sauvegarde avec l'ID
  const handleSaveEdit = async (marqueId, formData) => {
    console.log('ActionButtons handleSaveEdit called with:', marqueId, formData);
    
    if (onEdit) {
      // Passer les données au parent avec l'ID intégré si nécessaire
      const result = await onEdit(Marque, formData);
      return result;
    }
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="flex space-x-2">
       
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditModalOpen(true);
          }}
          className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-full transition-colors duration-200"
          title="Edit"
        >
          <FiEdit className="w-5 h-5" />
        </button>
      
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDeleteModalOpen(true);
          }}
          className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-full transition-colors duration-200"
          title="Delete"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>
      
      {editModalOpen && (
        <EditModal
          isOpen={editModalOpen}
          onClose={handleEditModalClose}
          marque={Marque} 
          onSave={handleSaveEdit}
        />
      )}
      
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          Marque={Marque}
          onConfirm={() => {
            onDelete(Marque.id);
            setDeleteModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ActionButtons;