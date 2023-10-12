import fs from 'fs'

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
}

// -----------------------------------------------------------



export const manager = new ProductManager('./products.json')

