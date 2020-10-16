import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import BannerJumbotron from "../components/BannerJumbotron";
import "../assets/css/FormulaireVictime.scss";
import { withRouter } from "react-router-dom";
import Api from "services/api/api"
class FormulaireVictime extends Component {
  state = {
    prenom: "",
    nom: "",
    age: 0,
    sexe: "",
    numerosTelephone: "",
    email: "",
    _idProvince: "",
    _idStructure: "",
    provinces: [],
    structures: [],
    errorMessage: "",
  };
  componentDidMount() {
    Api.get("provinces").then((res) => {
      this.setState({ provinces: res.data });
    });

    Api.get("acteurStructure").then((res) => {
      this.setState({ structures: res.data });
    });
  }

  changementPrenom = (e) => this.setState({ prenom: e.target.value });

  changementNom = (e) => this.setState({ nom: e.target.value });

  changementAge = (e) => this.setState({ age: e.target.value });

  changementsexe = (e) => this.setState({ sexe: e.target.value });

  changementNumerosTelephone = (e) =>
    this.setState({ numerosTelephone: e.target.value });

  changementEmail = (e) => this.setState({ email: e.target.value });

  changement_idProvince = (e) => this.setState({ _idProvince: e.target.value });

  changement_idStructure = (e) =>
    this.setState({ _idStructure: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const cas = {
      provinces: {
        _id: this.state._idProvince,
      },
      acteurStructures: {
        _id: this.state._idStructure,
      },
      prenom: this.state.prenom,
      nom: this.state.nom,
      age: parseInt(this.state.age),
      sexe: this.state.sexe,
      numerosTelephone: this.state.numerosTelephone,
      email: this.state.email,
    };

    console.log(cas);

      Api.post("casSoumis", cas)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.props.history.push("/");
      })
      .catch((erreur) => {
        console.log(erreur.response.data.error.errors._message);

        // this.setState({errorMessage: erreur.response.data});
      });
  };

  render() {
    return (
      <>
      <BannerJumbotron title="Brisez Le Silence - Stop Aux Viols En RDC"/>
        <div className="container_form" >
          <Form onSubmit={this.handleSubmit} autoComplete="off">
              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text"
                placeholder="Mujinga"
                onChange={this.changementNom}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Prenom</Form.Label>
                <Form.Control type="text"
                placeholder="Anne"
                onChange={this.changementPrenom}/>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number"
                placeholder="23"
                onChange={this.changementAge}
              />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Numero</Form.Label>
                <Form.Control  type="text"
                placeholder="+243826016607"
                onChange={this.changementNumerosTelephone}
              />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control  type="text"
                placeholder="name@example.com"
                onChange={this.changementEmail}
              />
              </Form.Group>

              <Form.Group as={Col}controlId="exampleForm.ControlSelect1">
              <Form.Label>Sexe</Form.Label>
              <Form.Control as="select" onChange={this.changementsexe}>
                <option value="" selected disabled hidden>
                  sélectionnez votre sexe
                </option>
                <option value="Feminin">Feminin</option>
                <option value="Masculin">Masculin</option>
              </Form.Control>
            </Form.Group>
            </Form.Row>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Province</Form.Label>
              <Form.Control as="select" onChange={this.changement_idProvince}>
                <option value="" selected disabled hidden>
                  sélectionnez votre province
                </option>
                {this.state.provinces.map((province) => (
                  <option key={province._id} value={province._id}>
                    {province.nom}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Structure d'Accompagnement</Form.Label>
              <Form.Control as="select" onChange={this.changement_idStructure}>
                <option value="" selected disabled hidden>
                  sélectionnez une structure{" "}
                </option>
                {this.state.structures.map((structure) => (
                  <option key={structure._id} value={structure._id}>
                    {structure.nom}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {this.state.errorMessage && (
              <div className="alert alert-danger" role="alert">
                {this.state.errorMessage}
              </div>
            )}
            <Button type="submit" variant="danger">
              Soumettre
            </Button>
          </Form>

        </div>
      </>
    );
  }
}

export default withRouter(FormulaireVictime);
