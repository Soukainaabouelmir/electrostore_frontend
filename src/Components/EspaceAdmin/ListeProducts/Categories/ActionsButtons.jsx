import React, { useState } from 'react';
import { FiEye, FiEdit, FiCopy, FiTrash2 } from 'react-icons/fi';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';


const ActionButtons = ({ Documents, onView, onEdit, onCopy, onDelete, onOpenAddModal }) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);

  const handleCopyClick = (e) => {
    e.stopPropagation();
    setCopyModalOpen(true);
  };

  const handleCopySubmit = (copiedDocumentsData) => {
    if (onCopy) {
      onCopy(copiedDocumentsData);
    }
    setCopyModalOpen(false);
  };
  
  const handleCopy = (e) => {
    e.stopPropagation(); // Prevent event propagation
    
    if (onOpenAddModal) {
      // Open add modal with pre-filled data
      onOpenAddModal(Documents);
    } else if (onCopy) {
      // Fallback to old behavior if onOpenAddModal is not provided
      onCopy(Documents);
    }
  };
  
  // Fonction corrigée - ne ferme plus le modal immédiatement
  const handleSaveEdit = (updatedData) => {
    if (onEdit) {
      onEdit(updatedData);
      // Ne pas fermer le modal ici - le EditModal le fait déjà avec un délai
    }
  };

  // Fonction pour fermer le modal d'édition
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setViewModalOpen(true);
          }}
          className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-full transition-colors duration-200"
          title="View"
        >
          <FiEye className="w-5 h-5" />
        </button>
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
      
    
      
      {viewModalOpen && (
        <ViewModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          Documents={Documents}
        />
      )}
      
      {editModalOpen && (
        <EditModal
          isOpen={editModalOpen}
          onClose={handleEditModalClose}
          Documents={Documents}
          onSave={handleSaveEdit}
        />
      )}
      
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          Documents={Documents}
          onConfirm={() => {
            onDelete(Documents.id);
            setDeleteModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ActionButtons;