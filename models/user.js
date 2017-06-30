var mongoose = require('mongoose'); // un schema define la forma que tendra la coleccion
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/fotos');

var posibles_valores = ["F", "M"];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email valido"];
var password_validation = {
                    validator : function(pass){
                        return this.password_confirmation == pass;
                    },
                    message : "Las contraseñas no son iguales"
                };

var userSchemaJSON = {
    name : String,
    last_name : String,
    username : {
        type : String,
        required : true,
        maxlength : [50, "NO debe ser mayor a 50 caracteres"],
        minlength : [5, "No debe ser menor a 5 caracteres"] },  
    password : {
        type : String,
        required : true,
        minlength : [8, "No debe ser menor a 8 caracteres"],
        validate :  password_validation
        }, 
    age : {
        type : Number, 
        min : [4, "No puede ser menor de 4"],
        max : [100, "No puede ser mayor a cien"] 
        },
    email : {
        type : String, 
        required : "Este campo es obligatorio",
        match : email_match
        },
    data_of_birth : Date, 
    sex : {
        type :String,
        enum : {
            values : posibles_valores, 
            message : "ERROR en el sexo"
            }
        } 

};


var user_schema = new Schema(userSchemaJSON);
user_schema.virtual("password_confirmation")
    .get(function(){
        return this.p_c;
    })
    .set(function(password){
        this.p_c = password; 
    });

var User = mongoose.model("User", user_schema);

module.exports.User = User;