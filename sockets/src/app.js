import express from 'express'
import routerViews from './routes/views.routes.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import ProductsController from './controllers/ProductsController.js'
import { Server } from 'socket.io'
import http from 'http'

const app = express()


const prodController = new ProductsController()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname + '/public'))
app.use('/static', express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', routerViews)

const httpServer = app.listen(8080, ()=>{
    console.log('server running')
})

const io = new Server(httpServer)
 
io.on('connection', socket =>{
    console.log('new connection')

    io.emit('allProducts', prodController.getProducts())

    socket.on('deleteProduct', data => {
        prodController.deleteProduct(parseInt(data));
        socket.emit('allProducts', prodController.getProducts());
    })
})

