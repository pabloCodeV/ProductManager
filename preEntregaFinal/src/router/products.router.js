import { Router } from "express"
import ProductController from '../controller/productsController.js'

const router = Router()
const productsPromise = new ProductController()


router.get('/:pid?', async(request, response) => {
    const id = request.params.pid
    const limit = request.query.limit

    let res
    if(id){
        res =  await productsPromise.getProductById(id)
        response.json(res)
    }
    else if(limit){
        res =  await productsPromise.getProducts(limit)
        response.json(res)
    }else{
        res =  await productsPromise.getProducts()
        response.json(res)
    }
        
})

router.post('/', async(request, response) => {
    let data = request.body
    const res = await productsPromise.addProduct(data.title , data.description , data.price , data.thumbnail, data.code, data.stock)
    try{
        response.send('Producto Cargado')
    }catch(e){
        console.log('ERROR', e)
        response.send('Ubo un error')
    }
})

router.put('/:pid?', async(request, response) => {
    if(!request.params.pid){
        console.log('ID Not Found')
        response.json({status:404,data:'ID Not Found'})
    }else{
        const data = request.body
        const id = request.params.pid
        const k = await productsPromise.updateProduct(id, data)
       response.send(k)
    }
})

router.delete('/:pid?', async(request, response) => {
    if(!request.params.pid){
        console.log('ID Not Found')
        response.json({status:404,data:'ID Not Found'})
    }else{
        const id = request.params.pid
       response.send(await productsPromise.deleteProduct(id))
      
    }
})

export default router