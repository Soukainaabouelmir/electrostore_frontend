import React, { useState } from 'react';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import Popup3DPreview from './Popup3DPreview';

const ActionButtons = ({ Popup, onView, onEdit, onCopy, onDelete, onOpenAddModal }) => {
    const [show3DPreview, setShow3DPreview] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);

  const handleCopyClick = (e) => {
    e.stopPropagation();
    setCopyModalOpen(true);
  };

  const handleCopySubmit = (copiedPopupData) => {
    if (onCopy) {
      onCopy(copiedPopupData);
    }
    setCopyModalOpen(false);
  };
  
  const handleCopy = (e) => {
    e.stopPropagation(); // Prevent event propagation
    
    if (onOpenAddModal) {
      onOpenAddModal(Popup);
    } else if (onCopy) {
      onCopy(Popup);
    }
  };
  
  // Fonction corrigée pour gérer la sauvegarde avec l'ID
  const handleSaveEdit = async (PopupId, formData) => {
    console.log('ActionButtons handleSaveEdit called with:', PopupId, formData);
    
    if (onEdit) {
      // Passer les données au parent avec l'ID intégré si nécessaire
      const result = await onEdit(Popup, formData);
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
                    setShow3DPreview(true);
                  }}
                  className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-full transition-colors duration-200"
                  title="Aperçu 3D"
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

      <Popup3DPreview
        isOpen={show3DPreview}
        onClose={() => setShow3DPreview(false)}
        Popup={Popup}
      />

      
      {editModalOpen && (
        <EditModal
          isOpen={editModalOpen}
          onClose={handleEditModalClose}
          Popup={Popup} 
          onSave={handleSaveEdit}
        />
      )}
      
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          Popup={Popup}
          onConfirm={() => {
            onDelete(Popup.id);
            setDeleteModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ActionButtons;