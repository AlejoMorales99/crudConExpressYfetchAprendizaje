const http = require("http");
const fs = require("fs");
const jsonUsuarios = require("./user.json");

const puerto = 5008;

const server = http.createServer((req,res) =>{
    
    //ESTE ENCABEZADO PRIMERO PONERLO DENTRO DE LAS RUTAS PARA EXPLICAR LO DE EL AMBITO DE VARIABLES
    res.setHeader("Content-type","text/html; charset=utf-8");

    if(req.url == "/"){

        res.statusCode = 200;
        res.end("<h1>Bienvenido a mi página de inicio</h1>");
    

    }else if(req.url == "/contacto"){

        res.statusCode = 200;
        res.end("<h1>Bienvenido a mi página de contacto</h1>");

    }else if(req.url == "/perrito"){

        fs.readFile('./perrito.jpg', (err,data) =>{

            if(err){
                res.statusCode = 500;
                res.end("<h1>internal server error</h1>")
            }else{
                //AQUI EXPLICAR QUE MACHACA EL SET HEADER DE ARRIBA
                res.setHeader("content-type" , "image/jpg");
                res.end(data);
            }

        } )

    }else if(req.url == "/usuarios"){

        //AQUI EXPLICAR IGUAL QUE MACHACA AL DE ARRIBA Y EXPLICAR QUE SE TIENE QUE ENVIAR EN FORMATO JSON CON STRINGIFY PARA PODER QUE EL NAVEGADOR LO ENTIENDA.

        res.setHeader("content-type", "application/json; charset=utf-8 ");
        res.end(JSON.stringify(jsonUsuarios));


        //AQUI EXPLICAR QUE ES NECESARIO METER REQ.METHOD = POST POR QUE ES UN METODO DEFIRENTE A GET, EN LOS ENDPOINT DE ARRIBA NO LO PUSE YA QUE POR DEFECTO SI NO SE PONE NADA SE ENTIENDE QUE ES GET
    }else if(req.url == "/insertarUsuario" && req.method == "POST" ){

        /*

        chunk-1
        naa

                chunk-2
                use
        */ 

        let body = "";

        req.on('data', chunk => {
            body += chunk.toString();
        })


        req.on('end', () =>{
            const data = JSON.parse(body);
            res.writeHead(201, {'content-type':'application/json; charset=utf=8'} );

            /* data.timestamp = Date.now(); */
            res.end(JSON.stringify(data));

        } )
        

    }else{
        res.statusCode = 404;
        res.end("<h1>404 pagina no encontrada.</h1>");
    }

    

})

server.listen(puerto , function() {
    console.log("servidor escuchando en el puerto http://localhost:" + puerto );
} )