import express from  'express'
import {manager} from './ProductManager.js'

const app = express()
app.use(express.urlencoded({extended:true}))

app.get('/products/', async(request, response) => {
    let limit = request.query.limit
    const products = await manager.getProducts()

    if(products.length <= 0 ){
        response.send('- No Se Encontraron Datos -')

    }else{

        if(!limit){
            response.send(products)
        }else{
            const productsLimit = products.slice(0, limit)
            response.json( productsLimit )
        }
    }

})

app.get('/product/:id', async(request, response) => {
    const id = parseInt(request.params.id)

    const productxId = await manager.getProductById(id)

    if(!request.params.id){
        response.send('- No se envio ID alguno en la Url -')
    }else{
        if(productxId){
            response.json(productxId)
        }else{
            response.send('- No se encontro ningun producto perteneciente a ese ID -')
        }
    }
    
})



const server = app.listen(8080, ()=>{
    console.log('Server Running')
})