import React, { Component } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import "../../../scss/FormulaireAjouterActeur.scss"
import API from "../../../services/api";
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class ModifierVbg extends Component{

    state ={
        type :"",
        trancheAge:"",
        sexe:"",
        auteur:"",
        province:"",
        provinces:[],
        typeAuteur:"",
        typeTrancheAge:"",
        typeViolence:"",
        provinceUnique:"",
        errorMessage: '',
        errorType: "",
        prov:"",
        dateViol: new Date("2014/02/08"),
        dateSoumition:""
    
    }

    componentDidMount(){

        console.log(this.props.match.params.id);
        const dat = this.props.match.params.id;

        this.setState({
            id:dat
        })

        API.get('vbg/'+dat).then((res)=>{
            this.setState({
                type:res.data.type_violence,
                province: res.data.province[0]._id,
                trancheAge: res.data.tranche_age_victime,
                sexe: res.data.sexe_victime,
                auteur:res.data.auteur_viol,
                dateViol: new Date(res.data.date.dateViol),
                dateSoumition: res.data.date.dateSoumition
            })
            console.log(this.state.province);
        })
        
       API.get("provinces")
      .then(res=>{
          this.setState({provinces : res.data});
          this.setState({provinceUnique: res.data.map(p=>{
            if(p._id==this.state.province){
              this.setState({prov:p})
            }
          })})
          console.log(this.state.prov);
          
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
        dateViol: date
      });
    };

handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.type);
    
    const elem = this.props.match.params.id;

    const newVbg ={
        province: 
        {
        _id: this.state.province
        },
        type_violence: this.state.type,
        sexe_victime: this.state.sexe,
        auteur_viol: this.state.auteur,
        tranche_age_victime	: this.state.trancheAge,
        date:{
          dateViol: this.state.dateViol,
          dateSoumition: this.state.dateSoumition
        }
  
        }

      console.log(newVbg);
      

    API.put("vbg/"+elem, newVbg)
    .then(res => {
      console.log(res);
      console.log(res.data);
      toast.success("Modification effectuer avec succes", toast.POSITION.TOP_RIGHT)
      this.props.history.push('/admin/acteurStructure/ListerVbg');
      
    }).catch((erreur)=> {
      console.log(erreur);
      
      this.setState({errorMessage: erreur.message});
      this.setState({errorType:erreur.message})
  });
}

  render(){
    return(
        <>
          <h1>Formulaire de modification VGB</h1>
        <div className="container_form">
        <Form onSubmit={this.handleSubmit}>
  <Row>
    <Col>
    <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Type de violence</Form.Label>
            <Form.Control as="select" onChange={this.changementType}>
            <option value={this.state.type} selected disabled >{this.state.type}</option>
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
              <option value="" selected disabled > {this.state.sexe} </option>
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
              <option value="" selected disabled> {this.state.trancheAge} </option>
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
        <Form.Control as="select" onChange={this.changementTrancheAge}>
          <option value="" selected disabled> {this.state.auteur} </option>
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
        selected={this.state.dateViol}
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
              <option value={this.state.prov._id} key={this.state.prov._id} selected disabled hidden> {this.state.prov.nom} </option>
    { this.state.provinces.map(province => <option key={province._id} value={province._id}>{province.nom}</option>)}
            </Form.Control>
          </Form.Group>
    </Col>
    </Row>
    <Button type="submit" variant="primary" className="bouton_form" >Enregistrer</Button>
</Form>
        </div>
        </>
    ) 
   }
}


export default ModifierVbg;





































