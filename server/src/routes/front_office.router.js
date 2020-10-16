module.exports = app =>{
    
    const front_office = require("../controllers/front_office.controller.js");
    const router  = require('express').Router();
    router.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
      });

    router.get("/vbgGeoJson",front_office.getVbgGeoJson);
    router.get("/vbgAamchart",front_office.getVbgAamchart)
    router.get("/acteurStructureGeojson",front_office.getActeurStructureGeoJson);
    router.get("/provinces",front_office.getProvinces);

    app.use('/api', router);
}