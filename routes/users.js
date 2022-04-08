const express = require('express');
const router = express.Router();
const { diskStorage } = require('multer');
const path = require('path');

//***MULTER***//
    // Dentro de este método va a recibir un objeto literal con 2 propiedas, el primero destination: que indica dónde guardar__
    // y filename que nombra del archivo

    destination: (req, file, cb) => //destination recibe una funcion que recibe el request, el archivo a subir y un callback cb
    {
        cb(null, path.join(__dirname, '../data/imgUsersData'))  //el primer parámetro siempre null, el segundo el path de la carpeta. El dirname nos posiciona en el punto donde estamos
    },

    filename (req, file, cb) => { //El filename es la propiedad que nombra el archivo

        cb(null, file.fieldname + '-' + Date.now()) //Así me lo enseñaron en la clase en vivo

    }
});

const upload = multer({ storage: storage }) //o {storage si es el mismo nombre} Acá esta constante se ejecuta toda la configuración que programamos de multer
//Acá acabamos, y nos vamos a la ruta del post que ejecuta el formulario




const usersController = require('../controllers/usersController');

router.get('/login', usersController.login);
router.get('/signup', usersController.signup);

router.post('/signup', usersController.store);
// upload.single('imagenUsuario'),
module.exports = router;