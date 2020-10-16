const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
module.exports=mongoose=>{
  var nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'le nom ne doit pas etre inferieur à 3 caractere',
    })
  ]
  var longitudeValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 250],
      message: 'la longitude ne doit pas etre inferieur à 3 caractere',
    })
  ]
  var latitudeValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 250],
      message: 'la latitude ne doit pas etre inferieur à 3 caractere',
    })
  ]
  var phoneValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 25],
      message: 'le numeros de télephone ne doit pas etre inferieur à 3 caractere',
    }),
    validate({
      validator: 'matches',
      arguments: /^\+243[0-9]{9}$/,
      message: 'le numeros de télephone est incorrecte, inspirez vous de cette exemple:(+243810951617)',
    }),
  ]
  var mailValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 45],
      message: 'votre adresse mail ne doit pas etre inferieur à 3 caractere',
    }),
    validate({
      validator: 'matches',
      arguments: /^[a-z0-9][a-z0-9_.]+@[a-z0-9_]+\.[a-z0-9]{2,6}$/,
      message: 'votre adresse mail est incorrecte, inspirez vous de cette exemple:(gmapwta6@gmail.com)',
    }),
  ]
  var typeValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 250],
      message: 'le type ne doit pas etre inferieur à 3 caractere',
    }),
    validate({
      validator: 'isAlphanumeric',
      passIfEmpty: true,
      message: 'le type ne doit pas etre vide et doit contenir une chaine de caractère',
    }),
  ]
  const ActeurStructure = mongoose.model(
    "acteurStructure",
    mongoose.Schema({
      nom: { type: String, required: true,validate:nameValidator},
      description: { type: String, required: false },
      province:
      [{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'province'
     }],
      adresse:{
          itineraire:{type:String,required:false},
          longitude:{type:String,required:true,validate:longitudeValidator},
          latitude:{type:String,required:true,validate:latitudeValidator}
      },
      contact:{
          numerosTelephone:{type:String,required:false,unique: true,validate:phoneValidator},
          numerosWhatsapp:{type:String,required:false,unique: true,validate:phoneValidator},
          email:{type:String,required:false,unique:true,validate:mailValidator}
      },
      type:{type:String,required:true,validate:typeValidator},
      img:{type:String,required:false,default:null},
      delete_at:{type:Date,default:null}
    }).plugin(uniqueValidator)
  )
  return ActeurStructure;
}

