var express = require("express");
var bodyParser = require("body-parser"); //para hacer parsing, leer parametros de la peticion
var User = require("./models/user.js").User;
var app = express(); // se ejecuta express
//var session = require("express-session"); ** se sustituye por cookie-session
var cookieSession = require("cookie-session");
var router_app = require("./routes_app.js");
var session_meddleware = require("./middlewares/session.js");
var methosOverride = require("method-override");

//middlewares
app.use("/public",express.static("./public")); //middleware para servir archivos estaticos
app.use(bodyParser.json()); //para peticiones aplication/json
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieSession({
    name : "session",
    keys : ["llave-1", "llave-2"]
}));
app.use(methosOverride("_method"))



app.set("view engine", "jade"); // modificamos el motor de vistas

app.get("/", function(req, res){
    res.render("index");
    console.log(req.session.user_id);
});

app.get("/login", function(req, res){
    res.render("login");

});

app.get("/singup", function(req, res){
    res.render("singup");

});

app.post("/users", function(req, res){
    console.log("Contraseña : " + req.body.password);
    console.log("email : " + req.body.email);
    var user = new User({email : req.body.email, 
                        password : req.body.password,
                        password_confirmation : req.body.password_confirmation,
                        username : req.body.username});
    user.save(function(err){
        if(err){
            res.send(String(err));
        }else{
            // ** Iniciar sesion al registrarse
            res.redirect("/app");
        }
        
    });
});

app.post("/sessions", function(req, res){
    User.findOne({email : req.body.email, password : req.body.password}, 
    function(err, user){
        req.session.user_id = user._id;
        res.redirect("/app");
    });
    
});

app.use("/app", session_meddleware);
app.use("/app", router_app);


app.listen(8080);