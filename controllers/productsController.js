const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

    search: (req, res) => {
        res.render('search');
    },

    products: (req, res) => {
        res.render('products', { products }); //se comparte la variable products con la vista products

    },
    detail: (req, res) => {
        const id = req.params.id
        const product = products.find(p => p.id == id) //Se hace este paso para que solo nos renderice un producto, el producto del id
        res.render("detail", { product })//se comparte la variable products con la vista detail
    },
    create: (req, res) => {
        res.render('product-create-form')
    },

    store: (req, res) => {
        // Do the magic
        let newProduct = {

            //Al new body le faltan 2 campos de la base de datos, el id y la imagen por lo que vamos a ponerlos:
            id: products[products.length - 1].id + 1, //el array de la base de datos tiene 8 elementos, nos queremos posicionar en el índice 7(el último del array) por lo tanto si el length es = 8, al restar 1 llegamos a la posición 7 del array que corresponde al último elemento
            name: req.body.name
            // ...req.body //sintaxis spread nos permite tener todos los elementos del objeto body body.name, body.price... sin tener que escribir 1 por 1
            //Así el new product va a tener todo lo del body
        }
        products.push(newProduct) //agrega al arreglo el producto que acabamos de insertar

        //     // express validator
        fs.writeFileSync(productsFilePath, JSON.stringify(products)) //Esto es necesario pero no entendí para qué se usa
        res.redirect("/products") //Redirige después de guarda un producto, se tiene que poner el path "completo"
        console.log(req.body)
    },

    edit: (req, res) => {
        const id = req.params.id
        const product = products.find(p => p.id == id)
        res.render("product-edit-form", { product })
    },

    update: (req, res) => {

        const id = req.params.id //recibimos el id desde el formulario
        //el findindex nos regresa el índicde el array de un producto, si existe nos regresa su valor, sino un -1
        const idn = products.findIndex(p => p.id == id) //buscamos el producto mediante el id
        products[idn] = { //accedemos al producto del índice "n"
            id,
            ...req.body, //copia todo del body
            image: products[idn].image
        }
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' ')) //no se crea una nueva variable sino que se actualiza con la nueva información nueva, todo está en esta línea
        res.redirect("/products/detail/" + id) //redirigimos a este path
    },

    shoppingCar: (req, res, next) => {
        res.render('shoppingCar');
    },

    delete: (req, res) => {
        const id = req.params.id //recibimos el id
        //el findindex nos regresa el índicde el array de un producto, si existe nos regresa su valor, sino un -1
        const idn = products.findIndex(p => p.id == id) //buscamos el producto mediante el id
        products.splice(idn, 1) //quita elementos de un array, el primer argumento es el indice donde empezamos a borrar y el segundo donde terminamos de borrar, esto supongo borra el elemento idn

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' ')) //no se crea una nueva variable sino que se actualiza con la nueva información nueva, todo está en esta línea
        res.redirect('/products') //redirigimos a este path
    }

};

module.exports = controller;

