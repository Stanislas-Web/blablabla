import React,{ Component } from "react";
import styled from 'styled-components'
import ItemForm from "./ItemForm";
import "../../assets/css/steepform.scss"
import { Button, Form, Row, Col } from 'react-bootstrap';

const Btn = styled.ul`
.btn1
{
  background: #0077FF;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 400px;
  // margin-right: 60px;
  padding: 20px 28px;
  border-right: 70px;
  border:1px solid #0077FF;
}
.btn2
{
  background: #ffffff;
  border-radius: 400px;
  // margin-right: 60px;
  padding: 20px 28px;
  border: 1px solid #cccccc;
}
.btn3
{
  background: #ffffff;
  border-radius: 400px;
  // margin-right: 60px;
  padding: 20px 28px;
  border: 1px solid #cccccc;
}
// .formulaire{
//   marggin-left: 30px;
// }
// .formulaire{
//   margin-left: 40px;
// }
// .btnsoumettre{
//   width: 290px;
// }
// .form{
//   padding-left: 500px;
}
// Form{
//   margin-right: 70px;
// }
.stepwizard-row:before {
  top: 24px;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 70%;
  height: 2px;
  background-color: #ccc;
  margin-left: 52px
  // margin-right: 18px
  /* z-order: 0; */
}
.stepwizard-step {
  display: table-cell;
  text-align: center;
  position: relative;
  // border: 1px solid red;
}
// .stepwizard-step p {
//   margin-top: 10px;
// }
.stepwizard-row {
  display: table-row;
}
.stepwizard {
  display: table;
  width: 40%;
  position: relative;
  margin: auto;
}
Form.Control{
  margin-left: 300px;
}
.formBasicEmail {
  background: red;
}
h4{
  margin-top: 15px;
}
.Control{
  // margin-left: 200px;
  margin: auto;
}
.container{
  width: 600px;
  height: 500px;
  background: #ffffff;
  margin: auto;
}
.btnsoumettre{
  margin:
}
.formContainer{
  padding:0 300px;
}
@media screen and (max-width:793px){
  .formContainer{
    padding:0 ;
  }
  h6{
    font-size: 12px;
  }
}
` 


export class Names extends Component{
  
  state={
    errorNom:"",
    errorPrenom:"",
    errorSexe:"",
    errorAge:""
    }
    

  continue = (nom, prenom, sexe, age)=>{
    // e.preventDefault()
    console.log("nga yeyoooooooooooo" + prenom);
    
    let verificateur=true;
    
    if(nom==""){
      this.setState({errorNom:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }else if(nom.length<3){
       this.setState({errorNom:"le nom doit avoir plus de 3 caractere"})
       verificateur=false
    }

    if(prenom==""){
      this.setState({errorPrenom:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }

    if(sexe==""){
      this.setState({errorSexe:"Veillez sélectionner"})
      verificateur=false
    }

    if(age==""){
      this.setState({errorAge:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }
  
    
    
    if(verificateur){
      this.props.nextStep();
    }
    
}

render(){
  const {values, inputChange} = this.props
  return (
    <div className="text-center">
    <Btn>
 


  <div className="mobile">
  <div className="stepwizard col-md-offset-3">
 <div className="">
 <div className="stepwizard-step">
 <button className="btn1">1</button>
 <h6 className="btn1Text">Identité</h6>
 </div>
 <div className="stepwizard-step">
 <button className="btn2" onClick={this.back}>2</button>
 <h6 className="btn2Text">Contact</h6>
 </div> 
 <div className="stepwizard-step">
  <button className="btn3">3</button>
  <h6 className="btn3Text">Description</h6>
  </div>
  </div>
  </div>

  </div>
  <div className="desktop">
  <div className="stepwizard col-md-offset-3">
 <div className="stepwizard-row setup-panel">
 <div className="stepwizard-step">
 <button className="btn1">1</button>
 <h6 className="btn1Text">Identité</h6>
 </div>
 <div className="stepwizard-step">
 <button className="btn2" onClick={this.back}>2</button>
 <h6 className="btn2Text">Contact</h6>
 </div> 
 <div className="stepwizard-step">
  <button className="btn3">3</button>
  <h6 className="btn3Text">Description</h6>
  </div>
  </div>
  </div>

  </div>
  </Btn>
  <br/>
<br/>

<div className="formContainerAdress">
  
<Form className="formulaire">
<Form.Group controlId="formBasicEmail">
 <Form.Control  type="text" placeholder="Nom" onChange={inputChange('Nom')} onInput={()=>{this.setState({errorNom:""})}} value={values.Nom}/>
 
 <span>{this.state.errorNom}</span>
</Form.Group>
<Form.Group controlId="formBasicPassword">
 <Form.Control type="text" placeholder="Prenom" onChange={inputChange('Prenom')} onInput={()=>{this.setState({errorPrenom:""})}} value={values.Prenom} />
 <span>{this.state.errorPrenom}</span>
</Form.Group>

<div className="mobile responsive">
<Form.Control as="select" onChange={inputChange('Sexe')} onSelect={()=>{this.setState({errorSexe:""})}} value={values.Sexe} >
 <option value="" selected disabled hidden>
                  votre sexe
  </option>
   <option>Homme</option>
   <option>Femme</option>
 </Form.Control>
 <span>{this.state.errorSexe}</span>
 <br/>
 <Form.Control type="number" placeholder="Age" onChange={inputChange('Age')} onInput={()=>{this.setState({errorAge:""})}} value={values.Age} />
   <span>{this.state.errorAge}</span>
   </div>
<Row className="desktop">
<Col>
 <Form.Control as="select" onChange={inputChange('Sexe')} onSelect={()=>{this.setState({errorSexe:""})}} value={values.Sexe} >
 <option value="" selected disabled hidden>
                  votre sexe
  </option>
   <option>Homme</option>
   <option>Femme</option>
 </Form.Control>
 <span>{this.state.errorSexe}</span>
 </Col>
 <Col>
   <Form.Control type="number" placeholder="Age" onChange={inputChange('Age')} onInput={()=>{this.setState({errorAge:""})}} value={values.Age} />
   <span>{this.state.errorAge}</span>
 </Col>
</Row>
<br/>
      <div className="text-center ">
          <Button variant="primary" style={{paddingLeft:"30px", paddingRight:"30px"}} type="submit"  className="bouton_form" onClick={(e)=> {e.preventDefault(); this.continue(values.Nom, values.Prenom, values.Sexe, values.Age)}}>Suivant</Button>
      </div>
</Form>


</div>
<br/>
<br/>
 </div>
  )
}
  
};

export default Names;