const express = require('express');
const router = express.Router();
const { diskStorage } = require('multer')
const path = require('path')

//***MULTER***//
const multer = require('multer') //Se requiere la librería multer en este archivo, porque acá se utilizará
//se le dice a multer dónde queremos y con qué nombre se guardan los archivos
// Con diskStorage se le dice a multer dónde se almacenará (en qué parte del servidor) se almacenan los archivos y qué nombre asignarle a los mismos

const storage = multer.diskStorage({//La constante hace uso del módulo y hace uso del método storage
    // Dentro de este método va a recibir un objeto literal con 2 propiedas, el primero destination: que indica dónde guardar__
    // y filename que nombra del archivo

    destination: (req, file, cb) => //destination recibe una funcion que recibe el request, el archivo a subir y un callback cb
    {
        cb(null, path.join(__dirname, '../data/imgUsersData'))  //el primer parámetro siempre null, el segundo el path de la carpeta. El dirname nos posiciona en el punto donde estamos
    },

    filename: (req, file, cb) => { //El filename es la propiedad que nombra el archivo

        console.log(file)
        const newFileName = 'newFileName' + Date.now() + path.extname(file.originalname);  // El nombre que le pusimos puede ser el que queramos pero para no tener problemas con que se sobreescriban 2__
        //entonces lo que hacemos es concatenar el objeto Date, el cual nos da una fecha que cambia mil veces por segundo(fecha en ms), y le concatenamos el nombre original del archivo con el path.ext (originalname así aparece en el objeto del console log)
        cb(null, newFileName) //El primer parámetro siempre es null y el segundo el nombre del archivo
        // console.log(newFileName)
    }
})

const upload = multer({ storage: storage }) //o {storage si es el mismo nombre} Acá esta constante se ejecuta toda la configuración que programamos de multer
//Acá acabamos, y nos vamos a la ruta del post que ejecuta el formulario




const usersController = require('../controllers/usersController');

router.get('/login', usersController.login);
router.get('/signup', usersController.signup);

router.post('/signup', upload.single('imagenUsuario'), usersController.store);

module.exports = router;