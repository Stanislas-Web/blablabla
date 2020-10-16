const db = require("../models");

const { JWT_SECRET } = require('../config/db.config')
const jwt = require('jsonwebtoken');
const bcryptjs=require('bcryptjs');


const GlobalVbg=require('../config/constants');
const Vbg = db.vbgs;
const ActeurStructure = db.acteurStructures;
const User = db.users;
const CasSoumis = db.casSoumis;
const Province = db.provinces;
const SuivisVbg=db.suivisVbgs;




/**
 * tout les actions concernant le dashboard
 * [affichage des stats,des details]
 */
exports.getGlobalStat = async (req, res) => {
  try {
    const dataStat = {
      nbrTotalVbg: await Vbg.estimatedDocumentCount(),
      nbrTotalStructure: await ActeurStructure.estimatedDocumentCount(),
      nbrTotalCasSoumis: await CasSoumis.estimatedDocumentCount(),
      nbrTotalUtilisateurs: await User.estimatedDocumentCount(),

      nbrSuivisTotal : await SuivisVbg.estimatedDocumentCount(),
      nbrSuivisEncours : await SuivisVbg.countDocuments({status : "encours"}),
      nbrSuivisTerminer : await SuivisVbg.countDocuments({status : "resolved"}),
      nbrSuivisEnPause : await SuivisVbg.countDocuments({status : "en pause"}),
    };

    res.status(200).json(dataStat);
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.getVueDashboard=(req,res)=>{
  Vbg.find({delete_at:null})
  .then((resultatvbg)=>{
    ActeurStructure.find({delete_at:null})
    .then((resultatacteur)=>{
      CasSoumis.find()
      .then((resulatcasoumis)=>{
        User.find()
        .then((resultatuser)=>{
          res.json({nbrTotalVbg:resultatvbg.length,nbrTotalStructure:resultatacteur.length,nbrTotalCasSoumis:resulatcasoumis.length,nbrTotalUtilistateur:resultatuser.length})
        })
      })
    })
  })
};

/**
 * tout les actions concernant le vbg
 * [affichage, Affichage par id,suppression ainsi que la modification]
 */

exports.getVbg = (req, res) => {
  Vbg.find({delete_at:null})
    .populate({ path: "province"})
    .then((vbgs) => {
      res.status(200).json(vbgs)
    })
    .catch((error) => res.status(400).json({ error }));
};
exports.deleteVbg=(req,res)=>{
  Vbg.updateOne({ _id: req.params.id },{delete_at:Date.now(), _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet supprimer !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.getVbgById=(req,res)=>{
  Vbg.findOne({ _id: req.params.id }).populate({path:'province',select:'nom'}).populate({path:'province',select:'geoJson'})
  .then(vbg => res.status(200).json(vbg))
  .catch(error => res.status(404).json({ error }));
};
exports.editVbg=(req,res)=>{
  Vbg.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
};
exports.createVbg=(req,res)=>{
  const vbg = new Vbg({
    ...req.body
  });
  vbg.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error}));
};
exports.getGlobalvbg=(req,res)=>{
  res.status(200).json({ type_violences: GlobalVbg.type_violences,auteur_viol:GlobalVbg.auteur_viol,tranche_age_victime:GlobalVbg.tranche_age_victime});
}

/**
 * tout les actions concernant l'Acteur et Structure
 * [affichage, Affichage par id,suppression ainsi que la modification]
 */

exports.getActeurStructure = (req, res) => {
  ActeurStructure.find({delete_at:null})
    .populate({ path: "province", select: "nom" })
    .populate({ path: "province", select: "geoJson" })
    .then((acteurs) => {
      res.status(200).json(acteurs)
    })
    .catch((error) => res.status(400).json({ error }));
};
exports.deleteActeurStructure=(req,res)=>{
  if(req.userInfo.role_user=="User_Structure")  return res.status(401).json({error:"vous n'etes pas authoriser à supprimer"})
  ActeurStructure.updateOne({ _id: req.params.id },{delete_at:Date.now(), _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet supprimer !'}))
  .catch(error => res.status(400).json({ error }));
}
exports.editActeurStructure=(req,res)=>{
  ActeurStructure.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
}
exports.getByIdActeurStructure = (req, res) => {
  ActeurStructure.findOne({ _id: req.params.id })
    .populate({ path: "province", select: "nom" })
    .populate({ path: "province", select: "geoJson" })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};
exports.createActeurStructure=(req,res)=>{
  const acteur = new ActeurStructure({
    ...req.body
  });
  acteur.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error}));
}

/**
 * tout les actions concernant l'Utilisateur
 * [l'authentification,l'affichage de tout les utilisateurs, ainsi que la creation d'un nouveau utilisateur]
 */
exports.setAuthentification=async(request,response) =>{
  const { username, password } = request.body
  await User.findOne({username}).populate('acteurStructures','nom')
  .then((savedUser) =>{
    if(!savedUser){
      return response.status(422).json({error: "Invalid nom ou password"})
  }
  bcryptjs.compare(password,savedUser.password)
  .then((reussie)=>{
    if(!reussie) return response.status(422).json({error: "Invalid nom ou password"})
    // return response.status(200).json({message:"utilisateur connecter avec succes"}) 
    const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
    const {username,email,telephone,password,role_user,acteurStructures}=savedUser
    return response.status(200).json({message:"utilisateur connecter avec succes",token,user:{username,email,telephone,password,role_user,acteurStructures}}) 
  })
  })
  .catch((error) => res.status(404).json({ error }));
};

exports.createUser=async(req,res)=>{
  if(req.userInfo.role_user!="Admin") return res.status(401).json({error:"vous n'etes pas authoriser à creer un utilisateur"})
  const {username,email,telephone,password, role_user,acteurStructures}=req.body
  if(!username )return res.status(422).json({erreur:"le username ne doit pas etre vide"})
  if(!telephone )return res.status(422).json({erreur:"le numeros de telephone ne doit pas etre vide"})
  if(!password )return res.status(422).json({erreur:"le mot de passe ne doit pas etre vide"})
  await User.findOne({username})
  .exec()
  .then((usernameFind)=>{
      if(usernameFind)return res.status(422).json({message:"username est déjà utiliser"})
      bcryptjs.hash(password,12)
      .then((passwordCrypt)=>{
        const user = new User({
        username,
        email,
        telephone,
        password:passwordCrypt,
        role_user,
        acteurStructures
        })
        user.save()
        .then((resultats) => res.status(201).json({ message: 'Objet enregistré !',resultat:resultats}))
        .catch((error) => res.status(404).json({ error }));

      })
      .catch(error=>console.log(error))
  })
  .catch(error=>console.log(error))
};

exports.getUsers=(req,res)=>{
  User.find()
      .populate('acteurStructures','nom')
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
};
exports.editUser=(req,res)=>{
  if(req.userInfo.role_user!="Admin") return res.status(401).json({error:"vous n'etes pas authoriser à modifier un utilisateur"})
  User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
}
exports.getUserById=(req,res)=>{
  User.findOne({ _id: req.params.id })
      .populate('acteurStructures','nom')
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
}
exports.deleteOneUser=(req,res)=>{
  if(req.userInfo.role_user!="Admin") return res.status(401).json({error:"vous n'etes pas authoriser à supprimer un utilisateur"})
  User.remove({_id: req.params.id})
  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch(error => res.status(400).json({ error }));
}

exports.deleteAllUser=(req,res)=>{
  User.remove({})
  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch(error => res.status(400).json({ error }));
}

/**
 * tout les actions concernant le casSoumis
 * [affichage, Affichage d'un detail de  casSoumis]
 * 
 */
exports.getCasSoumis=(req,res)=>{
  CasSoumis.find()
      .populate('provinces','nom')
      .populate('acteurStructures','nom')
      .then(casSoumis => res.status(200).json(casSoumis))
      .catch(error => res.status(400).json({ error }));
}
exports.getCasSoumisById=(req,res)=>{
  CasSoumis.findOne({ _id: req.params.id })
  .populate('provinces','nom')
  .populate('acteurStructures','nom')
  .then(casSoumis => res.status(200).json(casSoumis))
  .catch(error => res.status(404).json({ error }));
}
exports.createCasSoumis=(req,res)=>{
  const {prenom,nom,age,sexe, provinces,numerosTelephone,email,type_viol,description}=req.body
  if(req.query){
  // if(!req.query.id_acteurStructure.match(/^[0-9a-fA-F]{24}$/)) return res.status(422).json({error:"votre id ne pas bien ecrit veuillez saisir un id correct"})
      const casSoumisActeur=new CasSoumis({
        prenom,
        nom,
        age,
        sexe,
        provinces,
        numerosTelephone,
        email,
        acteurStructures:req.query.id_acteurStructure,
        type_viol,
        description
      })
      casSoumisActeur.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error}));  
  }else{
    const casSoumis = new CasSoumis({
          ...req.body
        })
    casSoumis.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error}));
  }
}

exports.deleteAllCasSoumis=(req,res)=>{
  CasSoumis.remove({})
  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch(error => res.status(400).json({ error }))
}

exports.getCasSoumisByActeurStructure=(req,res)=>{
  CasSoumis.find({ acteurStructures:req.params.id})
  .populate('provinces','nom')
  .populate('acteurStructures','nom')
  .then(casSoumis => res.status(200).json(casSoumis))
  .catch(error => res.status(404).json({ error }));
}

/**
 * les actions concernant la notification
 * [l'affichage de la notification ansi que la suppression une fois vue]
 */
exports.getNotifAdminCasSoumis=(req,res)=>{
  CasSoumis.find({status:null})
  .populate('provinces','nom')
  .populate('acteurStructures','nom')
  .then(casSoumis => res.status(200).json({totalNotif:casSoumis.length,casSoumis:casSoumis}))
  .catch(error => res.status(400).json({ error }));
};
exports.deleteNotifAdminCasSoumis=(req,res)=>{
  CasSoumis.updateOne({ _id: req.params.id },{status:true, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet supprimer !'}))
  .catch(error => res.status(400).json({ error }));
};
/**
 * les actions concernant le document suivisVbg
 *
 */
exports.createSuivisVbg=(req,res)=>{
  if(req.query.id_acteurStructure){
    const vbg = new Vbg({
      ...req.body
    });
    vbg.save();
    const suivisvbg=new SuivisVbg({
    acteurStructure:req.query.id_acteurStructure,  
    vbg:vbg._id
    })
    suivisvbg.save()
    .then(()=>res.status(200).json({ vbg: vbg,suivisvbg:suivisvbg}))
    .catch(error => res.status(400).json({ message:"erreur du serveur"}))
  }
}
exports.getsuivisVbgbyActeurStructure=(req,res)=>{
SuivisVbg.find({status:"encours",acteurStructure:req.params.id})
.populate('acteurStructure','nom')
.populate({path:'vbg',populate:{path:'province',select:'nom'}})
.then(suivisvbg => res.status(200).json(suivisvbg))
.catch(error => /*res.status(400).json({ error })*/ console.log(error))
}
exports.getsuivisVbg=(req,res)=>{
  SuivisVbg.find({status:"encours"})
  .populate('vbg')
  .populate('acteurStructure','nom')
  .then(suivisvbg => res.status(200).json(suivisvbg))
  .catch(error => res.status(400).json({ error }))
}

exports.resolvedsuivisVbg=(req,res)=>{
  SuivisVbg.updateOne({ _id: req.params.id },{status:"resolved", _id: req.params.id})
  .then(() => res.status(200).json({ message: 'Objet resolus !'}))
  .catch(error => res.status(400).json({ error }));
};