class ProductManager{

    constructor(){
        this.products = []
        this.id_product = 1
    }

    getProducts =  () => { return this.products}

    validateCode = (code) => {
        const codeExists = this.products.some(product => product.code === code);
        codeExists ? true : false
        return codeExists
    }

    validateDataProduct = (title, description, price, thumbnail, code, stock) => {
        let data = false
        if(!title || !description || !price || !thumbnail || !code || !stock){ data = true}
        return data
    }

    addProducts = (title, description, price, thumbnail, code, stock) => {

        if(this.validateDataProduct(title, description, price, thumbnail, code, stock)){
            return console.log(`Uno de los campos se encuentras vacios`) 
        }

        if(this.validateCode(code)){ 
            return console.log(`El producto ${title} con tiene el codigo ${code} que ya se encuentra en uso por otro producto.`)
        }
       
        let id =  this.id_product++
        const product = {
            id,
            title:title.trim(),
            description:description.trim(),
            price: parseFloat(price) || 0.00,
            thumbnail:thumbnail.trim(),
            code:code.trim(),
            stock:parseInt(stock) || 0
        }

        this.products.push(product)
    }

    getProductById = (id) => {
        const productFinder = this.products.find((product) => product.id === id);
        productFinder ? productFinder : "Not Found"
        return console.log(productFinder)

    }

}

const productManager = new ProductManager()

productManager.addProducts('              producto 1','esto es un producto', 500, 'http://photo.com', 'sku-123' , 10 )
productManager.addProducts('producto 2 ','esto es un producto 2', 1111, 'http://photo.com', 'sku-123' ,  )
productManager.addProducts('producto 3','esto es un producto', 500.12, 'http://photo.com', 'sku-122' , "10" )

console.log(productManager.getProducts())
productManager.getProductById(2)
