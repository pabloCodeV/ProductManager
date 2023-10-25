import express from 'express'
import routerProducts from './router/products.router.js'
import routerCarts from './router/carts.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(function(request,response, next){
    console.log(`[${request.url}] Time: ${new Date().toLocaleTimeString()}`)
    next()
})

app.use('/api/carts', routerCarts)
app.use('/api/products', routerProducts)

app.listen(8080, () => {
    console.log('Server Running...')
})