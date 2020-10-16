const faker = require('faker');
const db=require('../../models');
const Province = db.provinces;
const Vbg = db.vbgs;
faker.locale = "fr";
 const type_violences = ["Physique","Psychologique","Sexuelle","Harcèlement","Spirituelle","Financière"];
 const auteur_viol = ["Membre famile","Membre communauté","Voisin", "Inconnu"]; 
 const tranche_age_victime = ["Moins de 18","18 - 25","26 - 40", " plus de 60", "Âge inconnu"];
//  const categorie_victime = [];
 const sexe_victime = ["Masculin","Feminin"];
 

 db.mongoose.connect(db.url,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
//Inserer les données dans le doc 
seed(100)




 function seed(nbrElement){
     for (let i = 1; i < nbrElement; i++) {
        Province.count().exec(function (err, count) {
            // Get a random entry
            const random = Math.floor(Math.random() * count)
            // Again query all users but only fetch one offset by our random #
             Province.findOne().skip(random).exec(
              function (err, result) {
                // console.log(result);
                let vbg = new Vbg({
                    "type_violence":randomValueArray(type_violences),
                    "auteur_viol":randomValueArray(auteur_viol),
                    "tranche_age_victime":randomValueArray(tranche_age_victime),
                    // "categorie_victime":"mineur",
                    "sexe_victime":randomValueArray(sexe_victime),
                    "province": `${result._id}`,
                    "date":{
                        "dateViol": faker.date.between('2018-01-01','2020-06-01'),
                        "dateSoumition": faker.date.between('2018-01-01','2020-06-01')
                    }
                 })
                 console.log(vbg);
                 vbg.save();
              })
          })   
     }
 }
 function randomValueArray(tab){
    return tab[Math.floor(Math.random() * tab.length)];
 }
//  function getIdProvinceRandom(){
//     Province.count().exec(function (err, count) {
//         // Get a random entry
//         const random = Math.floor(Math.random() * count)
//         // Again query all users but only fetch one offset by our random #
//          Province.findOne().skip(random).exec(
//           function (err, result) {
//             console.log(result);
            
//             return result 
//           })
//       })
//  }


//Pour Vider le document
//  Vbg.find().then((p) => {
//     for (const element of p) {
//        console.log(element._id);
//        Vbg.deleteOne({ _id: element._id }, function (err) {
//         if (err) return handleError(err);
//         console.log(element);
//       });
//     }
//     });