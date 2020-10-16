import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import queryString from 'query-string'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Names from "./Names";
import { Component } from "@amcharts/amcharts4/core";
import Contact from "./Contact";
import Adresse from "./Address";

import Api from '../../services/api/api';
import { render } from 'react-dom';
import FlashMessage from 'react-flash-message'
import QueryString from "query-string"

// // import Contact from "./Contact";
// import Review from "./Review";
// import Submit from "./Submit";

// import "./styles.css";

export class MultiStepForm extends React.Component{
  state={
    step:1,
    Nom:'',
    Prenom:'',
    Sexe:'',
    Age:'',
    Province:'',
    Telephone:'',
    Email:'',
    Type_violence:'',
    Description:'',
    status: false
}





nextStep = () =>{
  const { step } = this.state;
  this.setState({step: step+1})
};

prevStep = () => {
  const { step } = this.state;
  this.setState({step: step -1});
}

inputChange = input => e => {
  this.setState({
      [input]: e.target.value
  })
}



Soummition =  e => {

 const params = window.location.hash;
 const parameters = params.split("=");
 console.log(`voici le params ${parameters[1]} `);
 
if( parameters[1] == undefined){
  
      const casSoumis = {
        provinces: {
        _id: this.state.Province,
      },
      prenom: this.state.Prenom,
      nom: this.state.Nom,
      age: parseInt(this.state.Age),
      sexe: this.state.Sexe,
      numerosTelephone: this.state.Telephone,
      email: this.state.Email,
      type_viol: this.state.Type_violence,
      description: this.state.Description,
    };
    
    
    console.log(`mon cas ${JSON.stringify(casSoumis)}`);
    
    
      Api.post("casSoumis", casSoumis)
      .then((res) => {
        toast.success("Soummition effectuer avec succes", toast.POSITION.TOP_RIGHT)
        window.location.href="/#"
      })
      .catch((erreur) => {
        console.log(erreur.response.data.error);
    
      });

}else{
      console.log(`mon state ${this.state.Structure}`);
      const casSoumis = {
        provinces: {
        _id: this.state.Province,
      },
      acteurStructures: {
        _id: parameters[1],
      },
      prenom: this.state.Prenom,
      nom: this.state.Nom,
      age: parseInt(this.state.Age),
      sexe: this.state.Sexe,
      numerosTelephone: this.state.Telephone,
      email: this.state.Email,
      type_viol: this.state.Type_violence,
      description: this.state.Description,
    };
    
    console.log(`mon cas ${JSON.stringify(casSoumis)}`);
    
      Api.post("casSoumis", casSoumis)
      .then((res) => {
        window.location.href="/#"
      })
      .catch((erreur) => {
        console.log(erreur.response.data.error);
    
      });

}

}

render(props){

  const {step} = this.state;
  const { Nom, Prenom, Sexe, Age, Province, Telephone, Email, Type_violence, Desccription } = this.state;
  const values ={ Nom, Prenom, Sexe, Age, Province, Telephone, Email, Type_violence, Desccription };

  switch(step){
      case 1:
          return(
              <Names 
                  nextStep={this.nextStep}
                  inputChange={this.inputChange}
                  values={values}
              />
          );
      case 2:
          return(
              <Contact 
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  inputChange={this.inputChange}
                  values={values}
              />
          );
      
          case 3:
            return(
                <Adresse 
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    inputChange={this.inputChange}
                    values={values}
                    Soummition={this.Soummition}
                />
            );
          
  }
}
  
};

export default MultiStepForm;