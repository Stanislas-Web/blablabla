const dbConfig=require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise=global.Promise;

const db={};
db.mongoose=mongoose;
db.url=dbConfig.url;
db.acteurStructures=require('./acteurStructure.model.js')(mongoose);
db.casSoumis=require('./casSoumis.model.js')(mongoose);
db.provinces=require('./province.model.js')(mongoose);
db.users=require('./user.model.js')(mongoose);
db.vbgs=require('./vbg.model.js')(mongoose);
db.villes=require('./ville.model.js')(mongoose);
db.suivisVbgs=require('./suivisVbg.model.js')(mongoose);

module.exports=db;

