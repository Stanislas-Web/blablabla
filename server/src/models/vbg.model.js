const validate = require('mongoose-validator');
module.exports=mongoose=>{
  var typeviolValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'le type de viol ne doit pas etre inferieur à 3 caractere',
    })
  ]
  var auteurviolValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'auteur viol ne doit pas etre inferieur à 3 caractere',
    })
  ]
  var trancheageValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'la tranche d\'age ne doit pas etre inferieur à 3 caractere',
    })
  ]
  var Vbg =mongoose.model(
    "vbg",
    mongoose.Schema({
      type_violence: { type: String, required: true,validate:typeviolValidator},
      auteur_viol: { type: String, required: true,validate:auteurviolValidator },
      tranche_age_victime: { type: String, required: true,validate:trancheageValidator },
      // categorie_victime: { type: String, required: true },
      sexe_victime:{type:String,required:false},
      province:
      [{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'province'
     }],
     
      date:{
          dateViol:{type:Date,required:true},
          dateSoumition:{type:Date,default:Date.now}
      },

      delete_at:{type:Date,default:null}
    })
  );
return Vbg;
}