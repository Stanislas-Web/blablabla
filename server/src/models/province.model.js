module.exports=mongoose=>{
  const Province = mongoose.model(
    "province",
    mongoose.Schema({
      nom:{type:String,required:true},
      geoJson:[mongoose.Schema.Types.Mixed],
    })
  );
  return Province;
}
