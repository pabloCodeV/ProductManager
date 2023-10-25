import { Router } from "express"
import  CartsController from '../controller/cartsController.js'

const router = Router()
const cartsPromise = new CartsController()


router.get('/:pid?', async(request, response) => {
    const id = request.params.pid
    const limit = request.query.limit

    let res
    if(id){
        res =  await cartsPromise.getCartsById(id)
        response.json(res)
    }
    else if(limit){
        res =  await cartsPromise.getCarts(limit)
        response.json(res)
    }else{
        res =  await cartsPromise.getCarts()
        response.json(res)
    }
        
})

router.post('/', async(request, response) => {
    let data = request.body
    const res = await cartsPromise.createCart(data.title , data.description , data.price , data.thumbnail, data.code, data.stock)
    try{
        response.send(res)
    }catch(e){
        console.log('ERROR', e)
        response.send('Ubo un error')
    }
})

router.post('/:cid/product/:pid', async (request, response) => {
    if(!request.params.cid || !request.params.pid){
        response.status(500).json({msj:'Internal Error'})
    }
      const idCart = parseInt(request.params.cid)
      const idProduct = parseInt(request.params.pid)
  
      if (idProduct <= 0) {
        return response.status(404).json({ error: "Invalid product" })
      }
      const cart = await cartsPromise.addProductAtCart(idCart, idProduct)

      if (!cart) {
        return response.status(404).json({ error: `The cart with id ${idCart} does not exist` })
      }
      response.status(200).json(cart)

  })



export default router