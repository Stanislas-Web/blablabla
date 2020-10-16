module.exports=mongoose=>{
  var Ville =mongoose.model(
    "ville",
    mongoose.Schema({
      nom:{type:String,required:true},
      localisation:{
        longitude:{type:String,required:true},
        latitude:{type:String,required:true},
      },
      province:
      [{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:'province'
      }]
    })
  );
return Ville;
}
