import {formatDataForAmChartPie} from "./amChart.helper"

export function formatVbg(vbg) {
  return vbg.map((element) => {
    return {
      id: element._id,
      type_violence: element.type_violence,
      auteur_viol: element.auteur_viol,
      tranche_age_victime: element.tranche_age_victime,
      sexe_victime: element.sexe_victime,
      province: element.province[0].nom,
      dateViol: element.date.dateViol,
      dateSoumition: element.date.dateSoumition,
    };
  });
}

export function formatStructure(structure) {
  return structure.map((element) => {
    return {
      id: element._id,
      nom: element.nom,
      img: element.img,
      description: element.description,
      type: element.type,
      adresse: element.adresse.itineraire,
      email: element.contact.email,
      numerosTelephone: element.contact.numerosTelephone,
      numerosWhatsapp: element.contact.numerosWhatsapp,
      province: element.province[0],
      latitude: element.adresse.latitude,
      longitude: element.adresse.longitude,
      
    };
  });
}

export function groupeByAttribut(data, attribut) {
  const dataGrouped = {};
  for (const element of data) {
    if (element.hasOwnProperty(attribut)) {
      if (!dataGrouped.hasOwnProperty(element[attribut])) {
        dataGrouped[element[attribut]] = [];
      }
      dataGrouped[element[attribut]].push(element);
    }
  }
  return dataGrouped;
}
export function groupeByProvince(data) {
  const dataGrouped = {};
  for (const element of data) {
    let att = element.province[0].nom;
    if (!dataGrouped.hasOwnProperty(att)) {
      dataGrouped[att] = [];
    }
    dataGrouped[att].push(element);
  }
  return dataGrouped;
}
export function groupeByYear(data, attribut_timestamp) {
  const dataGrouped = {};
  for (const element of data) {
    if (element.hasOwnProperty(attribut_timestamp)) {
      let year = new Date(element[attribut_timestamp]).getFullYear();
      if (!dataGrouped.hasOwnProperty(year)) {
        dataGrouped[year] = [];
      }
      dataGrouped[year].push(element);
    }
  }
  return dataGrouped;
}

export function getNbrVbgByProvinceInYear(vbg,province,year){
  return vbg.filter((element)=> new Date(element.dateSoumition).getFullYear() == year && element.province == province);
}
export function getStatByYear(data) {
  const stat = [];
  const current_year = new Date().getFullYear();
  const one_year_ago = current_year - 1;
  const two_year_ago = current_year - 2;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      let nbr = {
        label : key,
        current_year : 0,
        one_year_ago : 0,
        two_year_ago : 0,
        total : 0,
      };
      for (const element of data[key]) {
        let year = new Date(element.date.dateViol).getFullYear();
        if(year == current_year){
          nbr.current_year +=1
        }else if (year == one_year_ago){
          nbr.one_year_ago +=1
        }else if (year == two_year_ago){
          nbr.two_year_ago +=1
        }    
        nbr.total +=1
      }
      stat.push(nbr)
    }
  }
  
  return stat;
  
}

export function getLabelProvice(data){
  const label = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      label.push(key);
    }
  }
  return label;
}

export function trieObject(object){
  return object.sort(function (a, b) {
    return a > b;
  });
}

export function formatDataAmchartChronologie(data,att){
  const dataGrouped = [];
  const groupedYear = groupeByYear(data, "dateSoumition");
  for (const year in groupedYear) {
    if (groupedYear.hasOwnProperty(year)) {
      dataGrouped[year]=formatDataForAmChartPie(groupeByAttribut(groupedYear[year],att))
    }
  }
 return dataGrouped;
}
