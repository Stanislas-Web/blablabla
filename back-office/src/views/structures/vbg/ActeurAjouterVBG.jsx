import React,{Component} from "react";
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import "../../../scss/FormulaireAjouterActeur.scss";
import API from "../../../services/api";
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class AjouterVBG extends Component{

  
  
  state ={
    type:"",
    startDate:"",
    trancheAge:"",
    sexe:"",
    auteur:"",
    provinces:[],
    province:"",
    errorMessage: '',
    typeAuteur:"",
    typeTrancheAge:"",
    typeViolence:"",
    idUtilisateur:"",

    startDate: new Date()

}
    componentDidMount(){

      const tab =[];
      if (localStorage.getItem("users") === null) {
        window.location.href = "#/login";
    }else{
       const users = JSON.parse(localStorage.getItem("users") || "[]");
      tab.push({
            id:users.user._id,
            nom:users.user.username,
            role:users.user.role_user,
            acteurStructures:users.user.acteurStructures[0]._id,
        }) 
        this.setState({ idUtilisateur: tab[0].acteurStructures})
        console.log("ouiiiiiiiiiiiiiiiiii" + tab[0].acteurStructures);
        
      }

      API.get("provinces")
      .then(res=>{
          this.setState({provinces : res.data})
      })

      API.get("globalvbg")
      .then(res=>{
          this.setState({typeAuteur: res.data.auteur_viol}) 
          this.setState({typeTrancheAge: res.data.tranche_age_victime}) 
          this.setState({typeViolence: res.data.type_violences}) 
          console.log(this.state.typeTrancheAge);
      })


    }


changementType = e =>(this.setState({type:e.target.value}))

changementDate = e =>(this.setState({dateViol:e.target.value}))

changementProvince = e =>(this.setState({province:e.target.value}))

changementTrancheAge = e =>(this.setState({trancheAge:e.target.value}))

changementSexe = e =>(this.setState({sexe:e.target.value}))

changementAuteur = e =>(this.setState({auteur:e.target.value}))

handleChange = date => {
  this.setState({
    startDate: date
  });
};

handleSubmit = e => {
    e.preventDefault();

    const idUtilisateur = this.state.idUtilisateur;

    const newVbg ={
      province: 
      {
      _id: this.state.province
      },
      type_violence: this.state.type,
      sexe_victime: this.state.sexe,
      auteur_viol: this.state.auteur,
      date:{
        dateViol: this.state.startDate
      },
      tranche_age_victime: this.state.trancheAge

      }

      

      console.log(newVbg);
      
      API.post("suivisvbg?id_acteurStructure="+idUtilisateur, newVbg )
      .then(res => {
        console.log(res);
        console.log(res.data);
        toast.success("enregistrement effectuer avec succes", toast.POSITION.TOP_RIGHT)
        this.props.history.push('/structure/vbg/ActeurListerVBG');
      }).catch((erreur)=> {
      console.log(erreur.response.data);
      
      this.setState({errorMessage: erreur.message});
      console.log(this.state.errorMessage);
      
  });
}



  render(){
    return(
        <>
        
        <div>
          <h1>Formulaire d'insertions des VBG</h1>
        <div className="container_form">
        <Form onSubmit={this.handleSubmit}>
  <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Type de violence</Form.Label>
            <Form.Control as="select" onChange={this.changementType}>
            <option value={this.state.typeViolence[0]}> {this.state.typeViolence[0]} </option>
            <option value={this.state.typeViolence[1]}> {this.state.typeViolence[1]} </option>
            <option value={this.state.typeViolence[2]}> {this.state.typeViolence[2]} </option>
            <option value={this.state.typeViolence[3]}> {this.state.typeViolence[3]} </option>
            <option value={this.state.typeViolence[4]}> {this.state.typeViolence[4]} </option>
            <option value={this.state.typeViolence[5]}> {this.state.typeViolence[5]} </option>
            </Form.Control>
          </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1" onChange={this.changementSexe}>
            <Form.Label>Sexe</Form.Label>
            <Form.Control as="select">
              <option  value="Feminin">Feminin</option>
              <option value="Masculin">Masculin</option>
            </Form.Control>
          </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Tranche d'age du victime</Form.Label>
            <Form.Control as="select" onChange={this.changementTrancheAge}>
              <option value={this.state.typeTrancheAge[0]}> {this.state.typeTrancheAge[0]} </option>
              <option value={this.state.typeTrancheAge[1]}> {this.state.typeTrancheAge[1]} </option>
              <option value={this.state.typeTrancheAge[2]}> {this.state.typeTrancheAge[2]} </option>
              <option value={this.state.typeTrancheAge[4]}> {this.state.typeTrancheAge[3]} </option>
              <option value={this.state.typeTrancheAge[4]}> {this.state.typeTrancheAge[4]} </option>
            </Form.Control>
          </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Auteur</Form.Label>
        <Form.Control as="select" onChange={this.changementAuteur}>
          <option value={this.state.typeAuteur[0]}> {this.state.typeAuteur[0]} </option>
          <option value={this.state.typeAuteur[1]}> {this.state.typeAuteur[1]} </option>
          <option value={this.state.typeAuteur[2]}> {this.state.typeAuteur[2]} </option>
          <option value={this.state.typeAuteur[4]}> {this.state.typeAuteur[3]} </option>
        </Form.Control>
      </Form.Group>
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Label>Date</Form.Label> <br/>
    <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        dateFormat="yyyy-MM-dd"
        className="date"
      />
    </Col>
    </Row>
    <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Province</Form.Label>
            <Form.Control as="select" onChange={this.changementProvince}>
            {/* <option>Haut-Lomami</option>
              <option>Tshopo</option>
              <option>Tanganyka</option>
              <option>Tshopo</option>
              <option>Haut-Lomami</option>
              <option>Tshopo</option> */}
              <option value="" selected disabled hidden>sélectionnez votre province</option>
    { this.state.provinces.map(province => <option key={province._id} value={province._id}>{province.nom}</option>)}
            </Form.Control>
          </Form.Group>
    </Col>
    </Row>
    <Button type="submit" variant="primary" className="bouton_form">Enregistrer</Button>
</Form>
          </div>
        </div>
        </>
    ) 
   }
}

export default withRouter(AjouterVBG);
