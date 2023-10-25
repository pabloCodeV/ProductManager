import fs from 'fs'
import ProductController from './productsController.js'

const products = new ProductController()

class CartController {

    constructor (){
        this.path = './carts.json'
        this.format = 'utf-8'
        this.carts = []
    }

    getCarts = async (limit) => {   
        if(!fs.existsSync(this.path)) return []
        return  fs.promises.readFile(this.path, this.format)
        .then(content => limit ? JSON.parse(content).slice(0,limit) :JSON.parse(content))
        .catch(e => {
            console.log('ERROR', e)
            return []
        })
    }

    getCartsById = async (id) => {
        let filter = parseInt(id)

        if(!fs.existsSync(this.path)) return []
        return fs.promises.readFile(this.path, this.format)
        .then(content => JSON.parse( content ).find( ( item ) => item.id == filter ) )
        .catch(e => {
            console.log('ERROR', e)
            return []
        })
      }

    createCart = async () => {
        if(!fs.existsSync(this.path)){
            const cart = {
                            id: this.carts.length + 1,
                            products: []
                         }

            this.carts.push(cart)

            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
            return 'created cart successful'
        }

        this.carts = JSON.parse(await fs.promises.readFile(this.path, this.format))

        const cart = {
                        id: this.carts.length + 1,
                        products: []
                     }

        this.carts.push(cart)

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
        return 'created cart successful'
    }
    





    addProductAtCart = async (cid, pid) => {

            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(data)
            const carrito = this.carts.find(cart => cart.id === cid)
            const prod = await products.getProductById(pid)

            if(prod== undefined) return 'Product not found'
            if(carrito== undefined) return 'Cart not found'

            const product = carrito.products.find(p => p.pid == JSON.parseInt(pid))

            if(!product) {
                carrito.products.push({pid: pid, quantity: 1})
            } else {
                product.quantity ++
            }

            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
            return 'Se agrego el producto correctamente'
       
    }
}

export default CartController