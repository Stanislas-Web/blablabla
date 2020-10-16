const validate = require('mongoose-validator');
// const uniqueValidator = require('mongoose-unique-validator');
module.exports=mongoose=>{
  var prenomValidator=[
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'le prenom ne doit pas etre inferieur à 3 caractere',
    })
  ]
  var nomValidator=[
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'le nom ne doit pas etre inferieur à 3 caractere',
    })
  ]
  var ageValidator=[
    validate({
      validator: Number.isInteger,
      message: 'la propriete age doit etre un nombre et non une chaine de caractère',
    })
  ]
  var telephoneValidator=[
    validate({
      validator: 'isLength',
      arguments: [3, 25],
      message: 'le numeros de télephone ne doit pas etre inferieur à 3 caractere',
    }),
    validate({
      validator: 'matches',
      arguments: /^\+243[0-9]{9}$/,
      message: 'le numeros de télephone est incorrecte, inspirez vous de cette exemple:(+243810951617)',
    })
  ]
  var emailValidator=[
    validate({
      validator: 'isLength',
      arguments: [3, 45],
      message: 'votre adresse mail ne doit pas etre inferieur à 3 caractere',
    }),
    validate({
      validator: 'matches',
      arguments: /^[a-z0-9][a-z0-9_.]+@[a-z0-9_]+\.[a-z0-9]{2,6}$/,
      message: 'votre adresse mail est incorrecte, inspirez vous de cette exemple:(gmapwta6@gmail.com)',
    })
  ]
  var typeviolValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'le type de viol ne doit pas etre inferieur à 3 caractere',
    }),
    validate({
      validator: 'isAlphanumeric',
      passIfEmpty: true,
      message: 'le type de viol ne doit pas etre vide et doit contenir une chaine de caractère',
    }),
  ]
  var auteurviolValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'auteur viol ne doit pas etre inferieur à 3 caractere',
    }),
    validate({
      validator: 'isAlphanumeric',
      passIfEmpty: true,
      message: 'auteur viol ne doit pas etre vide et doit contenir une chaine de caractère',
    }),
  ]
    const CasSoumis = mongoose.model(
        "casSoumis",
        mongoose.Schema({
            prenom: { type: String, required: true,validate:prenomValidator },
            nom: { type: String, required: true,validate:nomValidator },
            age: { type: Number, required: false,validate:ageValidator },
            sexe:{type:String,required:true},
            provinces:
            [{
             type:mongoose.Schema.Types.ObjectId,
             required:false,
             ref:'province'
           }],
           numerosTelephone: { type: String, required: true,validate:telephoneValidator },
           email: { type: String, required: false,validate:emailValidator },
           date:{
            type:Date,default:Date.now
          },
          acteurStructures:
          [{
            type:mongoose.Schema.Types.ObjectId,
            required:false,
            ref:'acteurStructure'
          }],
          type_viol:{type:String,required:true},
          description:{type:String,required:false},
          status:{type:Boolean,default:null}
        }).plugin(uniqueValidator)
    );
      return CasSoumis;
}
