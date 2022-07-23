
//configuracion de variables//

const express = require('express')
const app = express()
require('dotenv').config();
const hbs=require('hbs');
const mysql2= require('mysql2');
const path=require('path');
//const nodemailer=require('nodemailer');
const Connection = require('mysql2');
const PORT = process.env.PORT || 3000;


//conecto la app a la base de datos//
const conexion= mysql2.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    port:process.env.PORTDB,
    database:process.env.DATABASE,
})




//configurar vista de la aplicacion
//motores de plantillas
// se estructuran por partes
//tiene que estar antes de las rutas
app.set('view engine', 'hbs'); //aca le indico que voy usar las plantillas de hbs
app.set('views', path.join(__dirname, 'views')); //aca le indica donde estan las plantillas con el dirname le digo que busque en la carpeta vista.
console.log(__dirname);
hbs.registerPartials(path.join(__dirname, 'views/partials')); //le indico que tiene que buscar las plantillas parciales

app.get('/', (req, res) =>{
    res.render('index', {titulo:'pagina principal 12/07/2022'})
});

//Configuración de Middelwares
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({extended: false}));

//configuracion de pagina producto
app.get('/producto', (req, res) =>{
    res.render('producto', {titulo:'Productos'})
}); 


app.get('/contacto', (req, res) =>{
    res.render('contacto', {titulo: 'COMPLETE EL FORMULARIO DE CONTACTO'})
});

//verbo http para recibir datos
app.post('/contacto', (req, res) =>{
    
    //console.log(req.body);
    //Desestructuración
    const { acorreo, muestragratis, descripcion} = req.body;
    
    //validacion básica
        if ( acorreo == "" ){
        let validacion = ' Faltan datos para ingresar la consulta'
        res.render('contacto', {
            titulo: 'COMPLETE EL FORMULARIO NUEVAMENTE',
            validacion
        })
    }else{
    console.log(acorreo);
    console.log(descripcion);

  
    //conectar();
    let data = {
        Mail: acorreo,
        descripcion: descripcion,
        
    }
    
  
   
    let sql = "INSERT INTO repost SET ?";

    let query = conexion.query(sql, data, (err, result)=>{
        if(err) throw err;       
         res.render('contacto', {titulo: 'COMPLETO EL FORMULARIO CON EXITO'})
    });
    }
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.on('error', (error) => {
    console.log(`tenemos un error ${port}`);
});


