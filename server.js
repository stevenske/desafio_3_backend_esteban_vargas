const Contenedor = require('./index'); 
const products = new Contenedor('products.json'); 
const PORT = 8080;

const express = require('express');
const app = express();

const server = app.listen(PORT , ()=> {
    console.log(`HTTP server listening on port http://localhost:${PORT}`)
})

app.get('/products', async (req, res) => {
    const allProducts = await products.getAll()
    res.send(allProducts)
})
app.get('/productRandom', async (req, res) => {
    const product = await products.getRandom()
    res.send(product)
})
app.get('/', (req, res) => {
    res.send('hi!!!')
})
server.on('error', error => {
    console.error(`Server error. ${error}`)
})