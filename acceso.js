// Desafío Black and White - Hans Contreras
// 01 Importar dependencias 
const yargs = require('yargs');
// Uso de child_process ejecuta procesos externos como si se tratase de un terminal de consola
const child = require('child_process');
// 02 Definir las Credenciales de acceso
const key = '123'

const argv = yargs
    .command(
        //03 Definir el comando "acceso"
        'acceso',
        // 04 Definir la descripcion del comnando "acceso"
        'Key de acceso al Server Black and White',
        {
            // 05 definir que se requiee el argumento "key"
            key: {
                describe: 'key',
                demand: true,
                alias: 'k',
            },
        },
        (args) => {
            //07
            args.key == key
                ? // 08 metodo .exec() prueba una coincidencia en una cadena
                  // devulve como resultado array o null
                child.exec('node server.js', (err, stdout) => {
                    err? console.log(err): console.log(stdout)
                })
                : //09
                console.log('Key incorrecta, Acceso denegado')
        }
    )
    .help().argv

