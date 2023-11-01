import fs from 'fs'
import __dirname from '../utils.js'

export default class ProductsController{

    constructor(){
        this.path = __dirname + '/products.json'
        this.format = 'utf-8'

    }


    getProducts = () => {
        if(!fs.existsSync(this.path)) return []
        let data = JSON.parse(fs.readFileSync(this.path, this.format))
        return data
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










