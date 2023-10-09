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
        this.getProducts()
        .then( users => {
           let exist = users.find( (item) => item.code === code)

           if(exist){
               return 'exCode'
           }else{
            let id
            users ? id = users.length + 1 : id = users[users.length-1].id + 1
  

             let newProduct = {
                id,
                title, 
                description, 
                price, 
                thumbnail, 
                code, 
                stock,
             }

             if(!Object.values(newProduct).includes(undefined) && !Object.values(newProduct).includes('')){
                users.push(newProduct)
                return users
             }else{
                return 'empty'
             }

           }

        })
        .then(newProduct => {
            if(typeof newProduct === 'object'){
                fs.promises.writeFile(this.path, JSON.stringify(newProduct))
                return console.log(newProduct)
            }else{
                
                switch(newProduct){
                    case 'exCode':
                        return console.log('Ya existe un producto con ese codigo')
                    case 'empty':
                        return console.log('Uno o mas campos se encuentran vacios')
                }
            }
                
        })
    }

// -----------------------------------------------------------
    updateProduct = async(data) => {

        if(!fs.existsSync(this.path)) return []

        return fs.promises.readFile(this.path, this.format)
        .then(content => {
            const dataJson = JSON.parse( content )
            let arreglo = dataJson.find( ( item ) => item.id === data.id )
  

            if(arreglo){
                dataJson[data.id - 1].title = data.title ? data.title : arreglo.title
                dataJson[data.id - 1].description = data.description ? data.description : arreglo.description
                dataJson[data.id - 1].price = data.price ? data.price : arreglo.price
                dataJson[data.id - 1].thumbnail = data.thumbnail ? data.thumbnail : arreglo.thumbnail
                dataJson[data.id - 1].code = data.code ? data.code : arreglo.code
                dataJson[data.id - 1].stock = data.stock ? data.stock : arreglo.stock
    
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
            let arreglo = dataJson.findIndex( ( item ) => item.id === idProduc )

            if(arreglo >= 0){
                dataJson.splice(arreglo,1)

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
    manajer.addProduct('12312','123','Pablo', 'Gonzalez', 222331217, 'JS Backemd')

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


add()
// searchAllProducts()
// searchByProduct(1)
// upDateByProduct({"id":4, 'title':'nuevo', 'description':'nuevo'})
deleted(3)





