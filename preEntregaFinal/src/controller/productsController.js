import fs from 'fs'

class ProductController{

    constructor(){
        this.path = './products.json'
        this.format = 'utf-8'
    }

    getProducts = async (limit) => {
        if(!fs.existsSync(this.path)) return []
        return  fs.promises.readFile(this.path, this.format)
        .then(content => limit ? JSON.parse(content).slice(0,limit) :JSON.parse(content))
        .catch(e => {
            console.log('ERROR', e)
            return []
        })
         
    }


    getProductById = async (id) => {
        let filter = parseInt(id)

        if(!fs.existsSync(this.path)) return []
        return fs.promises.readFile(this.path, this.format)
        .then(content => JSON.parse( content ).find( ( item ) => item.id == filter ) )
        .catch(e => {
            console.log('ERROR', e)
            return []
        })
    }


    addProduct = async(title, description, price, thumbnail, code, stock) =>{
        await this.getProducts()
        .then( products => {
           let exist = products.find( (item) => item.code === code)

           if(exist){
               return 'exCode'
           }else{
            let id
            products ? id = products.length + 1 : id = products[products.length-1].id + 1
  

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
                products.push(newProduct)
                return products
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

    updateProduct = async(id, data) => {
        if(!fs.existsSync(this.path)) return []

        const products = await this.getProducts();
        const update = products.find( (item) => item.id == id )

        if(update){
            products[update.id - 1].title = data.title ? data.title : update.title
            products[update.id - 1].description = data.description ? data.description : update.description
            products[update.id - 1].price = data.price ? data.price : arreglo.price
            products[update.id - 1].thumbnail = data.thumbnail ? data.thumbnail : update.thumbnail
            products[update.id - 1].code = data.code ? data.code : update.code
            products[update.id - 1].stock = data.stock ? data.stock : update.stock

            fs.writeFileSync(this.path, JSON.stringify(products))

            return 'Producto actualizado.'

        }else{
            return 'Error al Actualizar el producto:'
        }

    }


    deleteProduct = async(id) => {
        if(!fs.existsSync(this.path)) return []
  
        const products = await this.getProducts();
        const deleted = products.findIndex( (item) => item.id == id )

        if(deleted >= 0){
            products.splice(deleted,1)

            fs.writeFileSync(this.path, JSON.stringify(products))

            return 'Producto Borrado'

        }else{
            return 'ID Not Found'
        }
        
    }

}

export default ProductController