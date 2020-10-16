module.exports=mongoose=>{
    var SuivisVbg =mongoose.model(
      "suivisVbg",
      mongoose.Schema({
        acteurStructure:
        [{
          type:mongoose.Schema.Types.ObjectId,
          required:false,
          ref:'acteurStructure'
        }],
        vbg:
        [{
          type:mongoose.Schema.Types.ObjectId,
          required:false,
          ref:'vbg'
        }],
        status:{type: String,default:"encours"},
        created_at:{type:Date,default:Date.now}
      })
    );
  return SuivisVbg;
  }