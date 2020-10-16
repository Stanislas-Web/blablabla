const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
module.exports=mongoose=>{
  var usernameValidator=[
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'le nom ne doit pas etre inferieur à 3 caractere',
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
  var passwordValidator=[
    validate({
      validator: 'isLength',
      arguments: [8, 205],
      message: 'le mot de passe  ne doit pas etre inferieur à 8 caractere',
    })
  ]
  const  User =mongoose.model(
    "user",
    mongoose.Schema({
      username: { type: String, required: true,validate:usernameValidator },
      email: { type: String, required: false,unique:true,validate:emailValidator },
      telephone:{type:String,required:true,unique:true,validate:telephoneValidator},
      password: { type: String, required: true ,validate:passwordValidator},
      role_user: { type: String, required: false },
      acteurStructures:
          [{
            type:mongoose.Schema.Types.ObjectId,
            required:false,
            ref:'acteurStructure'
          }]
    }).plugin(uniqueValidator)
  )
  return User;
}
