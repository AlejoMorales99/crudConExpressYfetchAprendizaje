const express = require('express');

//explicar esto al final de todo
//const cors = require("cors");


const usuarios = require('../../user.json');
const fs = require("fs");
const crypto = require('crypto');
const { url } = require('inspector');

const app = express();
const puerto = 5001;


app.use(express.json())

//EXPLICAR ESTO AL FINAL DE TODO
/* app.use(cors({
    origin: '*' , 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));
 */

//METODOS NORMALES : GET/POST
//METODOS COMPLEJOS: PUT/DELETE

//cors pre-fligth
//option

//const urlPermitidas = ['http://localhost:5500', 'http://127.0.0.1:5500'];

//app.disable("x-powered-by");

app.get('/' , (req,res) =>{
    res.send("node con express!!!");;
});


app.get('/getusuarios' , (req,res) =>{

    //explicar esto para guardar multiples url
    /* if(urlPermitidas.includes(req.headers.origin)){
        res.header('Access-Control-Allow-Origin' , req.headers.origin);
    }

    res.json(usuarios); */


    res.header('Access-Control-Allow-Origin' , '*');
    res.json(usuarios); 
});

app.get('/getOneusuarios/:id' , (req,res) =>{

    res.header('Access-Control-Allow-Origin' , '*');

    const idObtenido = req.params.id;
    const usuarioPorId = usuarios.find(recorrerUsuario => recorrerUsuario.id == idObtenido)

    if(usuarioPorId){
        res.status(200).json(usuarioPorId);
    }else{
        res.status(404).json( {error: `No se encontro al usuario con el id ${idObtenido}`} );
    }
});


app.get('/perrito', (req, res) => {
    fs.readFile('./perrito.jpg', (err, data) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.set('Content-Type', 'image/png'); // Establecer el tipo de contenido como imagen JPEG
            res.status(200).send(data);
        }
    });
});


app.get('/getFiltrarCiudades/:ciudad' , (req,res) =>{

    const ciudadObtenida = req.params.ciudad;
    //HACER ESTO DEPSPUES DE EXPLICAR SIN LA CONVERSION A MAYUSCULAS
    /* const guardarJsonCiudades = usuarios.filter(recorrerCiudades => recorrerCiudades.city);

    for (let i = 0; i < guardarJsonCiudades.length; i++) {
        guardarJsonCiudades[i].city = guardarJsonCiudades[i].city.toUpperCase();
    }

    const ciudadesFiltradas = guardarJsonCiudades.filter(recorrerCiudades => recorrerCiudades.city == ciudadObtenida.toUpperCase())
 */
   

    const ciudadesFiltradas = usuarios.filter(recorrerCiudades => recorrerCiudades.city == ciudadObtenida)

    if(ciudadesFiltradas){
        res.status(200).json(ciudadesFiltradas);
    }else{
        res.status(404).json( {error: `No se encontro al usuario con el id ${ciudadObtenida}`} );
    }
});

app.post('/insertarUsuario', (req,res) =>{

    res.header('Access-Control-Allow-Origin' , '*');

    const id = crypto.randomUUID();
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const ciudad = req.body.ciudad;

    if(nombre == ""  ||  ciudad == "" ){
        return res.status(400).json({error: "Se enviaron campos vacios"});
    }else{

        const nuevoUsuario = {
            id:id,
            nombre:nombre,
            apellido: apellido || 'no tiene apellido' ,
            ciudad:ciudad
        }
    
        usuarios.push(nuevoUsuario);
        //fs.writeFileSync('./user.json', JSON.stringify(usuarios, null, 2));
    
        res.status(201).json(nuevoUsuario);

    }
});



app.put('/actualizarUsuario/:id', (req,res) => {

    res.header('Access-Control-Allow-Origin' , '*');
    const idUsuario = req.params.id;
    
    
    const obtenerUsuario = usuarios.find(buscarUsuario => buscarUsuario.id == idUsuario);

    if(obtenerUsuario){

        obtenerUsuario.nombre = req.body.nombre;
        obtenerUsuario.apellido = req.body.apellido;
        obtenerUsuario.ciudad = req.body.ciudad;


        //EXPLICAR ESTO SI ALGUIEN PREGUNTA COMO MODIFICARLO PERMANENTEMENTE.
        //fs.writeFileSync('./user.json', JSON.stringify(usuarios, null, 2));

        res.status(200).json(obtenerUsuario);

    }else{

        res.status(500).json({error: "no se encontro el usuario con el id" , idUsuario });

    }

});


app.delete('/eliminarUsuario/:id', (req,res ) => {

    res.header('Access-Control-Allow-Origin' , '*');
    const idUsuario = req.params.id;

    const usuarioEliminar = usuarios.findIndex(u => u.id == idUsuario);


    if(usuarioEliminar != -1){

        usuarios.splice(usuarioEliminar,1);
        //fs.writeFileSync('./user.json', JSON.stringify(usuarios, null, 2));

        res.status(200).send('Usuario eliminado con exito!'); 

    }else{
        res.status(500).json({error: "no se encontro el usuario con el id" , idUsuario });
    }

     

});


app.options(['/insertarUsuario' , '/eliminarUsuario/:id', '/actualizarUsuario/:id'] , (req,res) => {

    const urlPermitidas = ['http://localhost:5500', 'http://127.0.0.1:5500'];

    if(urlPermitidas.includes(req.headers.origin)){
        res.header('Access-Control-Allow-Origin' , req.headers.origin);
        res.header('Access-Control-Allow-Methods', ['POST' , 'DELETE','PUT']);
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).send('ok');
    }else{
        res.status(400).json({Error: `la url ${req.headers.origin} no tiene permisos` });
    }

    
})





app.listen(puerto , () =>{
    console.log(`Servidor escuchando en el puerto http://localhost:${puerto}`);
})