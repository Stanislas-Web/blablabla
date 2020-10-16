import React,{Component} from "react";
import styled from 'styled-components'
// import ItemForm from "./ItemForm";
import { Button, Form, Row, Col } from 'react-bootstrap';
import "../../assets/css/Contact.scss";

import Api from '../../services/api/api';
import "../../assets/css/steepform.scss"



const Btn = styled.ul`
.btn1
{ 
  background: #ffffff;
  border-radius: 400px;
  // margin-right: 60px;
  padding: 20px 28px;
  border: 1px solid #cccccc;
}
.btn2
{
  background: #0077FF;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 400px;
  padding: 20px 28px;
  border: 1px solid #0077FF;
}
.btn3
{
  background: #ffffff;
  border-radius: 400px;
  // margin-right: 60px;
  padding: 20px 28px;
  border: 1px solid #cccccc;
}
.stepwizard-row:before {
  top: 24px;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 70%;
  height: 2px;
  background-color: #ccc;
  margin-left: 52px
}
.stepwizard-step {
  display: table-cell;
  text-align: center;
  position: relative;
  margin-left: 100px;
}
.stepwizard-row {
  display: table-row;
  margin-left: 300px;
}
.stepwizard {
  display: table;
  width: 40%;
  position: relative; 
  margin: auto;
}
.form{
  position: auto;
  width: 50%;
  height: 70%;
  background: red;
}
// Btn{
//   margin: auto;
// }
container{
  width: 60%;
  background: red;
}
h4{
  margin-top: 15px;
}
.container{
  width: 600px;
  height: 500px;
  background: #ffffff;
  margin: auto;
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


export class Contact extends Component{

  state = {
    provinces: [],
    errorProvince:"",
    errorTelephone:"",
    errorEmail:""
  }

  componentDidMount() {
    Api.get("provinces").then((res) => {
      this.setState({ provinces: res.data });
    });
  }
  continue = (province, Telephone, email)=>{

    let verificateur=true;
    
    if(province==""){
      this.setState({errorProvince:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }

    if(Telephone==""){
      this.setState({errorTelephone:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }else if(Telephone.substr(0, 4) != "+243"){
      this.setState({errorTelephone:"le numero doit commencer par +243"})
      verificateur=false
    } else if(Telephone.length>13 || Telephone.length<13){
      this.setState({errorTelephone:"Ce numero n'est pas valide"})
      verificateur=false
    }

    if(email==""){
      this.setState({errorEmail:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }else if(email.length<8){
      this.setState({errorEmail:"Format email incorect"})
      verificateur=false
    }else if(!(email.lastIndexOf("@"))){
      this.setState({errorEmail:"Format email incorect"})
      verificateur=false
    }
  
    if(verificateur){
      this.props.nextStep();
    }
}
back = e=>{
  e.preventDefault();
  this.props.prevStep();
}

render(){
  const {values, inputChange} = this.props
  return (
    <div className="text-center">
     <Btn>
 

<div className="desktop">
 <div className="stepwizard col-md-offset-3">
 <div className="stepwizard-row setup-panel">
 <div className="stepwizard-step">
 <button className="btn1" onClick={this.back}>1</button>
 <h6 className="btn1Text">Identité</h6>
 </div>
 <div className="stepwizard-step">
 <button className="btn2" >2</button>
 <h6 className="btn2Text">Contact</h6>
 </div> 
 <div className="stepwizard-step">
  <button className="btn3">3</button>
  <h6 className="btn3Text">Description</h6>
  </div>
  </div>
  </div>
  </div>


  <div className="mobile">
 <div className="stepwizard col-md-offset-3">
 <div className="">
 <div className="stepwizard-step">
 <button className="btn1" onClick={this.back}>1</button>
 <h6 className="btn1Text">Identité</h6>
 </div>
 <div className="stepwizard-step">
 <button className="btn2" >2</button>
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

    <Form.Control as="select"  onChange={inputChange('Province')}  value={values.Province}>
    <option value="" selected disabled hidden>
                  sélectionnez votre province
                </option>
      { this.state.provinces.map(provinces => <option value={provinces._id} key={provinces._id}>{provinces.nom}</option>)}
  </Form.Control>
  <span>{this.state.errorProvince}</span>
  <br />
 <div className="mobile">


    <Form.Control type="text" placeholder="Télephone" onChange={inputChange('Telephone')} onInput={()=>{this.setState({errorTelephone:""})}} value={values.Telephone} />
  <span>{this.state.errorEmail}</span>
  
  <br/>
  
    <Form.Control type="email" placeholder="Email" onChange={inputChange('Email')} onInput={()=>{this.setState({errorEmail:""})}} value={values.Email} />
  <span>{this.state.errorEmail}</span>
  </div>
 
<Row className="desktop">
  <Col>
    <Form.Control type="text" placeholder="Télephone" onChange={inputChange('Telephone')} onInput={()=>{this.setState({errorTelephone:""})}} value={values.Telephone} />
    <span>{this.state.errorTelephone}</span>
  </Col>
  <br/>
  <Col>
 
    <Form.Control type="email" placeholder="Email" onChange={inputChange('Email')} onInput={()=>{this.setState({errorEmail:""})}} value={values.Email} />
    <span>{this.state.errorEmail}</span>
  </Col>
</Row>
<br />

          <div className="text-center">
              <Button variant="primary"  style={{paddingLeft:"30px", paddingRight:"30px"}} type="submit" onClick={(e)=> {e.preventDefault(); this.continue(values.Province, values.Telephone, values.Email)}} className="bouton_form">Suivant</Button>
          </div>
</Form>
  </div>
  <br/>
  <br/>
  </div>
  )
}
}

export default Contact;