import axios from 'axios';
import { event } from 'jquery';
import React, { Component } from 'react';

const CARD_API_BASE_URL = 'http://localhost:8080/eco/Save';

class CreateEmployee extends Component {
  constructor(props) {
    super(props);

    // Initialize state to store form data
    this.state = {
      nom: '',
      address: '',
      capaciteStock: 0,
      planStock: '',
      informationContrat: '',
    };
    this.handleSaveCard=this.handleSaveCard.bind(this);
  }
  changeNom = (event) =>{
    this.setState({nom: event.target.value});
  }

  // Function to handle the API call
  createEmployee = async (stade) => {
    try {
      const response = await axios.post(CARD_API_BASE_URL, stade);
      console.log('Stade saved successfully', response.data);
      // Optionally, you can redirect the user or perform other actions after successful save
    } catch (error) {
      console.error('Error saving stade', error);
    }
  };

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSaveCard = (event) => {
    event.preventDefault();

    // Extract data from state
    const {
      nom,
      address,
      capaciteStock,
      planStock,
      informationContrat,
    } = this.state;

    // Construct the request payload
    const payload = {
      id: 0,
      information_contrat: informationContrat,
      address: address,
      nom: nom,
      capacite_stock: capaciteStock,
      plan_stock: planStock,
    };

    // Call the API function
    this.createEmployee(payload);
  };
  render() {
    return (
      <section className="content">
        <div className="wrapper">
          <div className="formulaire">
            <form>
              <div>
                <h2>Formulaire Stade </h2>
                <div className="form1">
                  <div className="form-group">
                    <label htmlFor="nom">Nom:<span className="star">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom"
                      placeholder="Nom"
                      value={this.state.nom}
                      onChange={this.changeNom}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address:<span className="star">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="form2">
                  <div className="form-group">
                    <label htmlFor="capaciteStock">Capacite stock:<span className="star">*</span></label>
                    <input
                      type="number"
                      className="form-control"
                      id="capaciteStock"
                      placeholder="Capacite Stock"
                      value={this.state.capaciteStock}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="planStock">Plan Stock:<span className="star">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="planStock"
                      placeholder="Plan Stock"
                      value={this.state.planStock}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="informationContrat"> Information Contrat:<span className="star">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="informationContrat"
                      placeholder="informationContrat"
                      value={this.state.informationContrat}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="button">
                <input
                  type="submit"
                  className="btn btn-success"
                  onClick={this.handleSaveCard}
                  value="Envoyer"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default CreateEmployee;
