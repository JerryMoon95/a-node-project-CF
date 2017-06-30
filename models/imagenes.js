var mongoose = require('mongoose'); // un schema define la forma que tendra la coleccion
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/fotos');


var img_schema = new Schema({
    title : {
        type: String,
        required : true
        },
    url : String
});

var Imagen = mongoose.model("Imagen", img_schema);

module.exports = Imagen;