const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    login: (req, res) => {
        res.render('login');
    },
    signup: (req, res) => {
        res.render('signup');
    },

    store: (req, res) => {

        const newUser = {
            ...req.body
        }
        users.push(newUser)

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '))

        if (req.file == undefined) { //Acá para validar podemos poner varias opciones tipo "que sea menor en tamaño", "sea más grande que...etc"
            console.log(req.file) //nos entrega todos los datos del file, sino se sube un file, entonces el resultado de este es undefined
        }
        else { //sino llega ningún file entonces recargamos de nuevo la página
            res.render('/users/signup')
        }
        res.redirect("/users/login")
    }
}

module.exports = controller;