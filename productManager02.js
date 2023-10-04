const fs = require('fs')

class ProductManager{

    constructor(filename){
        this.path = filename
        this.format = 'utf-8'

    }

// -----------------------------------------------------------
    getProducts = async () => {
        if(!fs.existsSync(this.path)) return []
        return fs.promises.readFile(this.path, this.format)
        .then(content => JSON.parse(content))
        .catch(e => {
            console.log('ERROR', e)
            return []
        })
    }

// -----------------------------------------------------------
    getProductById = async(id) => {
        if(!fs.existsSync(this.path)) return []
        return fs.promises.readFile(this.path, this.format)
        .then(content => JSON.parse( content ).find( ( item ) => item.id === id ) )
        .catch(e => {
            console.log('ERROR', e)
            return []
        })
    }

// -----------------------------------------------------------
    addProduct = async(title, description, price, thumbnail, code, stock) =>{
        return this.getProducts()
        .then( users => {
            let id = users.length + 1
            users.push({id,title, description, price, thumbnail, code, stock})
            return users
        })
        .then(newProduct => fs.promises.writeFile(this.path, JSON.stringify(newProduct)))
    }

// -----------------------------------------------------------
    updateProduct = async(data) => {

        if(!fs.existsSync(this.path)) return []

        return fs.promises.readFile(this.path, this.format)
        .then(content => {
            const dataJson = JSON.parse( content )
            let arreglo = dataJson.find( ( item ) => item.id === data.id )
  

            if(arreglo){
                const id = data.id - 1
                dataJson[id].title = data.title ? data.title : arreglo.title
                dataJson[id].description = data.description ? data.description : arreglo.description
                dataJson[id].price = data.price ? data.price : arreglo.price
                dataJson[id].thumbnail = data.thumbnail ? data.thumbnail : arreglo.thumbnail
                dataJson[id].code = data.code ? data.code : arreglo.code
                dataJson[id].stock = data.stock ? data.stock : arreglo.stock
    

                fs.writeFile(this.path, JSON.stringify(dataJson), (error) => {
                    if (error) {
                      console.error('Error al Actualizar el producto:', error);
                    } else {
                      console.log('Producto actualizado.');
                    }
                })
            }

        })

        .catch(e => {
            console.log('ERROR', e)
            return []
        })
    }

// -----------------------------------------------------------

    deleteProduct = async(idProduc) => {

        if(!fs.existsSync(this.path)) return []

        return fs.promises.readFile(this.path, this.format)
        .then(content => {
            const dataJson = JSON.parse( content )
            let arreglo = dataJson.find( ( item ) => item.id === idProduc )

            if(arreglo){
                const id = idProduc - 1
                dataJson[id].title = ''
                dataJson[id].description = ''
                dataJson[id].price = ''
                dataJson[id].thumbnail = ''
                dataJson[id].code = ''
                dataJson[id].stock = ''


                fs.writeFile(this.path, JSON.stringify(dataJson), (error) => {
                    if (error) {
                        console.error('Error al Actualizar el producto:', error);
                    } else {
                        console.log('Producto Borrado.');
                    }
                })
            }

        })

        .catch(e => {
            console.log('ERROR', e)
            return []
        })
        }

    }

// -----------------------------------------------------------



const manajer = new ProductManager('./users.json')

add = async () =>{ 
    manajer.addProduct('asdasd','asdasdasdasd','Pablo', 'Gonzalez', 27, 'JS Backemd')
    console.log( await manajer.getProducts()) 
}

searchAllProducts = async () =>{
    console.log( await manajer.getProducts()) 
}

searchByProduct = async (id) =>{ 
    console.log( await manajer.getProductById(id)) 
}

upDateByProduct = async (date) =>{ 
    console.log( await manajer.updateProduct(date)) 
}

deleted = async (idProduc) =>{ 
    console.log( await manajer.deleteProduct(idProduc)) 
}


// add()
// searchAllProducts()
// searchByProduct(1)
// upDateByProduct({"id":4, 'title':'nuevo', 'description':'nuevo'})
// deleted(1)





