// Desafío Black and White - Hans Contreras
// Importar dependencias

const Jimp = require('jimp'); // paquete Jimp para el procesamiento de imagenes
const http = require('http'); // Modulo http nos permite crear servidores, realizar consultas a recursos externos,etc.
const url = require('url'); // Modulo URL dicide una direccion web en partes legibles
const fs = require('fs');
const port = 8080;


http. // Creación de servidor http
    createServer((req, res) => { //el argumento req representa la solicitud del cliente como un objeto
                                 //el argumento res representa la respuesta a la solicitud
        // 02. Ruta raiz devuelve el HTML con el formulario para el ingreso de la url
        if (req.url == '/') {
            // Se especifica en la cabecera que el contenido devuelto debe ser interpretado como HTML
            res.writeHead(200, { 'Content-Type': 'text/html' });
            // Se devuelve la data del archivo index.html con el metodo fs.readFile
            fs.readFile('index.html', 'utf8', (err, data) => {
                // Se termina la consulta con el metodo "end" del parametro "res" entregando como argumento la data del html
                res.end(data)
            })
        }

        // 03. Estilos definidos en un archivo CSS alojado en la siguiente ruta
        if (req.url == '/estilos') {
            // Se especifica en la cabecera que el contenido devuelto debe ser interpretado como CSS
            res.writeHead(200,  { 'Content-Type': 'text/css' })
            // Se devuelve la data del archivo style.css fs.readFile
            fs.readFile('style.css', (err, css) => {
                // se termina la consulta con el metodo "end" del parametro "res" entregando como argumento la data del CSS
                res.end(css)
            });
        }

        // Constantes para obtener la url de la imagen desde el formulario
        // url.parse() Analisa la direccion y devuelve un objeto URL con cada parte de la direccion como propiedades.
        const params = url.parse(req.url, true).query;
        const urlImagen = params.imagen;

        // Ruta "/imagen" que muestra la imagen procesada con jimp
        if (req.url.includes('/imagen')) {
            // Se usa el metodo "read" del objeto Jimp definiendo como primer parametro la url de la imagen
            Jimp.read(urlImagen, (err, imagen) => {
                // aplicar el procesamiento de la imagen
                imagen
                    .grayscale() //escala de grises
                    .quality(60) //calidad del 60%
                    .resize(350, Jimp.AUTO) //redimensionada a 350px de ancho
                    .writeAsync('newimg.jpg') //se guarda con un nuevo nombre
                    .then(() => { // se retorna la promesa
                        // Usar el Modulo fs para la lectura del archivo creado
                        fs.readFile('newimg.jpg', (err, Imagen) => {
                            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                            res.end(Imagen)
                        })
                    })
            })

        }

    })
    .listen(`${port}`, console.log(`Escuchando puerto ${port}`))


