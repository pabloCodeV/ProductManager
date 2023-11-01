import express from 'express'
import fs from 'fs'
import __dirname from '../utils.js'


const router = express.Router()

router.get('/', (req, res) =>{
    const data = JSON.parse(fs.readFileSync(__dirname +'/products.json', 'utf8'))
    res.render('home', {data})
})

router.get('/realtimeproducts', (req, res) =>{
    res.render('realTimeProducts', {})
})


export default router