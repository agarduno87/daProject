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
        const newProduct = {
            id: products[products.length - 1].id + 1, //Eso es para obtener el id nuevo del producto y colocárselo, debe ser el último id
            //el id es base cero, entonces el último id si son 16 elementos sería 15. entonces se agarra el length que es 16, el id sería 15. por eso es length-1.
            //entonces el último id seria el products.length-1 + 1. Hasta ahora sólo me da el id +1 como si fuera una concatenación
            ...req.body
        }
        products.push(newProduct) //agrega al arreglo el producto que acabamos de insertar

        //     // express validator
        fs.writeFileSync(productsFilePath, JSON.stringify(products)) //Esto es necesario pero no entendí para qué se usa

        //Si no subimos archivo entonces nos crea un bucle que redirige al formulario hasta que subamos una foto
        if (req.file != undefined) { //Acá para validar podemos poner varias opciones tipo "que sea menor en tamaño", "sea más grande que...etc". 
            //nos entrega todos los datos del file, sino se sube un file, entonces el resultado de este es undefined
            res.redirect("/products") //Redirige después de guarda un producto, se tiene que poner el path "completo"

        }
        else { //sino llega ningún file entonces recargamos de nuevo la página
            res.render('product-create-form')
        }

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

