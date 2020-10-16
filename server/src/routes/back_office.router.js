module.exports = app =>{
    
    const back_office = require("../controllers/back_office.controller.js");
    const router  = require('express').Router();
    const infoUser=require('../middleware/infoUser')
    router.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
      });

    /**
     * les routes concernant le vbg
     * [route pour la visualisation,visualisation par id,
     *  suppression,modification,et enfin création]
     */
    router.get("/vbg",back_office.getVbg);
    router.delete("/vbg/:id",back_office.deleteVbg);
    router.get("/vbg/:id",back_office.getVbgById);
    router.put("/vbg/:id",back_office.editVbg);
    router.post("/vbg",back_office.createVbg);
    router.get("/globalvbg",back_office.getGlobalvbg)

    /**
     * les routes concernant le dashboard
     */
    router.get("/totaldashboard",back_office.getVueDashboard);
    router.get("/getGlobalStat",back_office.getGlobalStat);

     /**
     * les routes concernant l'Acteur et Structure
     * [route pour la visualisation,visualisation par id,
     *  suppression,modification,et enfin création]
     */
    router.get("/acteurStructure",back_office.getActeurStructure);
    router.delete("/acteurStructure/:id",infoUser,back_office.deleteActeurStructure);
    router.put("/acteurStructure/:id",back_office.editActeurStructure);
    router.get("/acteurStructure/:id",back_office.getByIdActeurStructure);
    router.post("/acteurStructure",back_office.createActeurStructure);

    /**
     * les routes concernant l'utilisateur
     * [l'authentification ansi que la creation d'un utilisateur]
     */
    router.post("/authentification",back_office.setAuthentification);
    router.post("/user",infoUser,back_office.createUser);
    router.get("/user",back_office.getUsers);
    router.get("/user/:id",back_office.getUserById);
    router.put("/user/:id",infoUser,back_office.editUser);
    router.delete("/user/:id",infoUser,back_office.deleteOneUser);
    // router.delete("/user",back_office.deleteAllUser);

    /**
     * les routes concernant le casSoumis
     * [afficher tout les casSoumis, afficher un detail d'un casSoumis]
     */
    router.get("/casSoumis",back_office.getCasSoumis);
    router.get("/casSoumis/:id",back_office.getCasSoumisById);
    router.post("/casSoumis",back_office.createCasSoumis);
    router.get("/casSoumisbyActeur/:id",back_office.getCasSoumisByActeurStructure);
    router.delete("/casSoumis",back_office.deleteAllCasSoumis);
    /**
     * les routes concernant les notifications
     */
    router.get("/notificationAdmin",back_office.getNotifAdminCasSoumis);
    router.delete("/notificationAdmin/:id",back_office.deleteNotifAdminCasSoumis)
    /**
     * les routes concernant le suivis vbg
     */
    router.post('/suivisvbg',back_office.createSuivisVbg);
    router.get('/suivisvbg',back_office.getsuivisVbg);
    router.delete('/resolvedsuivisvbg/:id',back_office.resolvedsuivisVbg);
    router.get('/suivisvbgbyActeur/:id',back_office.getsuivisVbgbyActeurStructure);



    
    
    
    app.use('/api', router);
}