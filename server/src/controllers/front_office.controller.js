const db = require("../models");
const Vbg = db.vbgs;
const ActeurStructure = db.acteurStructures;
const Province=db.provinces;


exports.getVbgGeoJson = (req, res) => {
  Vbg.find({})
    .populate({ path: "province", select: "nom" })
    .populate({ path: "province", select: "geoJson" })
    .then((vbg) => {
      const geoJson = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "urn:ogc:def:crs:OGC:1.3:CRS84",
          },
        },
        features: [],
      };
      for (const element of vbg) {
        let coord = element.province[0].geoJson[0].properties
          ? element.province[0].geoJson[0].properties.center.split(",")
          : [];
        for (let i = 0; i < coord.length; i++) {
          coord[i] = parseFloat(coord[i]);
        }
        console.log(coord);

        let f = {
          type: "Feature",
          properties: {
            id: element._id,
          },
          geometry: {
            type: "Point",
            coordinates: coord,
          },
        };
        geoJson.features.push(f);
      }
      res.status(200).json(geoJson);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getVbgAamchart=(req,res)=>{
  Vbg.find({})
  .populate({ path: "province", select: "nom" })
  .populate({ path: "province", select: "geoJson" })
  .then((vbg)=>{
    const amchart={
      date:[],
      province:[],
      type_violence:[],
      tranche_age:[],
      sexe:[]
    };
for (const element of vbg){
  console.log();
  
  let provinces={
    properties:{
      name:element.province[0].geoJson[0].properties
      ? element.province[0].geoJson[0].properties.name.split(",")
      : []
    }
  }
  amchart.province.push(provinces);
  let dates={
    date:element.date.dateSoumition
  }
  amchart.date.push(dates);
  let type_violences={
    type_violence:element.type_violence
  }
  amchart.type_violence.push(type_violences);
  let tranche_ages={
    tranche_age:element.tranche_age_victime
  }
  amchart.tranche_age.push(tranche_ages);
  let sexes={
    sexe:element.sexe_victime
  }
  amchart.sexe.push(sexes);
}
res.status(200).json(amchart);
})
.catch((error) => res.status(400).json({ error }))
}

exports.getActeurStructureGeoJson = (req, res) => {
  ActeurStructure.find()
    .then((acteurs) => {
      const geoJson = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "urn:ogc:def:crs:OGC:1.3:CRS84",
          },
        },
        features: [],
      };
      for (const element of acteurs) {
        let f = {
          "type": "Feature",
          "properties": {
            "NAME": element.nom,
            "NAME_FR": element.type,
            "ADDRESS": element.adresse.itineraire,
            "ITINERAIRE":element.adresse.itineraire,
            "CONTACT":element.contact.numerosTelephone,
            "EMAIL":element.contact.email
          },
          "geometry": {
            "type": "Point",
            "coordinates": [parseFloat(element.adresse.longitude), parseFloat(element.adresse.latitude)]
          }
        };
        geoJson.features.push(f);
      }
      res.status(200).json(geoJson);

    })
    .catch((error) => res.status(400).json({ error }));
};
exports.getProvinces=(req,res)=>{
  Province.find()
      .then(provinces => res.status(200).json(provinces))
      .catch(error => res.status(400).json({ error }));
};






