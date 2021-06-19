const fs = require("fs");
const path = require("path");

const Cart = require("./cart");
// const products = [];
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
      cb(JSON.parse(fileContent));
      }
    });
        
}
module.exports = class Product {
    constructor(id, title, description, imageUrl, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }
    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                  console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                }) 
            }
        })
    }

    static deleteById(id) {
        getProductsFromFile((products) => {
            const product = products.filter(product => product.id === id);
            const updatedProduct = products.filter((product) => product.id === id);
            fs.writeFile(p, JSON.stringify(updatedProduct), err => {
              if (!err) {
                  Cart.deleteProduct(id, product.price);
              }
          })
        //   cb(product);
        });
    }
    
    static fetchProducts(cb) {
        getProductsFromFile(cb)
    }

    static fetchProductById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }
}