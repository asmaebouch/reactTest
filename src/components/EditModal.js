// EditModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CARD_API_BASE_URL = "http://localhost:8080/eco";

const EditModal = ({ isOpen, onClose, stade }) => {
    const [displayedStade, setDisplayedStade] = useState(stade || { nom: '', address: '', information_contrat: '', plan_stock: '', capacite_stock: '' });
    const [editedStade, setEditedStade] = useState({ nom: '', address: '', information_contrat: '', plan_stock: '', capacite_stock: '' });
  
    useEffect(() => {
      // Update editedStade whenever stade changes
      setEditedStade(stade || { nom: '', address: '', information_contrat: '', plan_stock: '', capacite_stock: '' });
    }, [stade]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedStade((prevStade) => ({
        ...prevStade,
        [name]: value,
      }));
    };

  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Add logic to save modifications (e.g., make an API request)
      const response = await axios.put(`${CARD_API_BASE_URL}/updateStade`, editedStade);

      if (response.ok) {
        console.log('Modifications enregistrées avec succès');
        onClose(); // Close the modal after saving modifications
      } else {
        console.error('Erreur lors de l\'enregistrement des modifications');
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des modifications', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Modifier le stade</h2>
      <form>
        <label>
          Nom :
          <input
            type="text"
            name="nom"
            value={editedStade.nom}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address :
          <input
            type="text"
            name="address"
            value={editedStade.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Information Contrat :
          <input
            type="text"
            name="information_contrat"
            value={editedStade.information_contrat}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Plan Stock :
          <input
            type="text"
            name="plan_stock"
            value={editedStade.plan_stock}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Capacite Stock :
          <input
            type="text"
            name="capacite_stock"
            value={editedStade.capacite_stock}
            onChange={handleInputChange}
          />
        </label>
        <button type="button"  onClick={(e) => handleSaveChanges(e)}>
          Enregistrer les modifications
        </button>
        <button type="button" onClick={onClose}>
          Annuler
        </button>
      </form>
    </Modal>
  );
};

export default EditModal;
