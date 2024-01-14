import { faCircle ,faCheckCircle,faTrash,faPen} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes,Route, Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditModal from './EditModal'; // Adjust the path based on your project structure

const CARD_API_BASE_URL = "http://localhost:8080/eco";

function Card() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStade, setSelectedStade] = useState(null);

  const openEditModal = (stade) => {
    setSelectedStade(stade);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedStade(null);
    setIsEditModalOpen(false);
  };
  const navigate = useNavigate();

  const addStade = () => {
    navigate('/add-stade');
  };
  const [stades, setStades] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer la liste des stades depuis l'API
    /*const fetchStades = async () => {
      try {
      //  const response = await fetch(`${CARD_API_BASE_URL}`);
       const response = await axios.get(CARD_API_BASE_URL);

        const data = await response.json();
        setStades(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des stades', error);
      }
    };*/
    const fetchStades = async () => {
  try {
    const response = await fetch(`${CARD_API_BASE_URL}`);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des stades. Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      setStades(data);
    } else {
      // Handle non-JSON responses
      console.error('Le serveur a renvoyé une réponse non-JSON.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des stades', error);
  }
};


    // Appel de la fonction de récupération lors du montage du composant
    fetchStades();
  }, []); // Les crochets vides indiquent que ce hook s'exécute uniquement lors du montage du composant
  
  const handleDeleteProduct = async (stadeId) => {
    try {
      // Envoyer une requête DELETE au backend pour supprimer le stade avec l'ID correspondant
      const response = await fetch(`${CARD_API_BASE_URL}/${stadeId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Si la suppression est réussie du côté du backend, mettre à jour l'état local
        const newStades = stades.filter((s) => s.id !== stadeId);
        setStades(newStades);
        console.log('Stade supprimé avec succès');
      } else {
        console.error('Erreur lors de la suppression du stade');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du stade', error);
    }
  };
 
  return (
    <div>
      {/* Content Wrapper. Contains page content  className="content-wrapper" */}
      <div >
        <div className='p-3'>
          <div className='card'>
            <div className='card-body'> 
              <h3>Liste des Stades</h3>
              <div className='row'>
                <button className='btn btn-primary'  onClick={addStade}>Ajouter Stade  </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Address</th>
                    <th>Information Contrat</th>
                    <th>Plan Stock</th>
                    <th>Capacite Stock</th>
                    {/* Ajoutez d'autres colonnes en fonction de vos besoins */}
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(stades) && stades.map(stade => (
                    <tr key={stade.id}>
                      <td>{stade.id}</td>
                      <td>{stade.nom}</td>
                      <td>{stade.address}</td>
                      <td>{stade.information_contrat}</td>
                      <td>{stade.plan_stock}</td>
                      <td>{stade.capacite_stock}</td>
                      <td><button  className='btn btn-outline-success' onClick={() => openEditModal(stade)}>
                        <FontAwesomeIcon
                       // icon={stade.checked  ? faCheckCircle:faCircle}
                      icon={faPen } 
                        ></FontAwesomeIcon>
                        </button></td>
                        <td>
                        <button onClick={() => handleDeleteProduct(stade.id)} className='btn btn-outline-danger'>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </button>
                        </td>
                      {/* Ajoutez d'autres cellules en fonction de vos besoins */}
                    </tr>
                  ))}
                </tbody>
              </table>
               {/* Render the EditModal component */}
               <EditModal
  isOpen={isEditModalOpen}
  onClose={closeEditModal}
  stade={selectedStade}
  onUpdateStadeList={fetchStades} // Mettez à jour la liste des stades après la modification
  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
