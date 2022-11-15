let fs = require("fs")


class Container {
    constructor(file) {
        this.file = file
    }


    async save(title, price, thumbnail) {
        let product = {
            title: title,
            price: price,
            thumbnail: thumbnail
        }
        let stock = await this.getAll();
        try {
            if (stock.length === 0) {
                product.id = 0;
                stock.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(stock, null))
            } else {
                product.id = stock[stock.length - 1].id + 1
                stock.push(product)
                await fs.promises.writeFile(this.file, JSON.stringify(stock, null))
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getById(id) {
        let products = await this.getAll();
        try {
            let idFinder = products.find(e => e.id == id)
            return console.log(idFinder);
        } catch (error) {
            console.log(error)
        }
    }
    async getAll() {
        try {
            const products = await fs.promises.readFile(this.file)
            return JSON.parse(products)
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteById(id) {
        const products = await this.getAll();
        const newProductsArray = products.filter(product => product.id !== id)
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(newProductsArray))
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, JSON.parse('[]'))
        } catch (error) {
            console.log(error)
        }
    }
    async getRandom(){
        const products = await this.getAll()
        return this.checkLength(products) ? products[Math.floor(Math.random() * products.length)] : null
    }
    checkLength(arr){
        if (arr.length === 0){
            console.error('The array is empty')
            return false
        }
        return true
    }
}

const file = new Container('products.json')

module.exports = Container;

// save new product on file products.json //

// file.save('Lapiz','123,00','https://i.imgur.com/8xpEaJk.jpeg');

//find a product by id //

// file.getById(3);

// delete all the products//

// file.deleteAll()

// delete by the id of a product//
// file.deleteById(3)