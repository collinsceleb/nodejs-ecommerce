const fs = require("fs");
const path = require("path");
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
    constructor(title, description, imageUrl, price) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }
    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }
    
    static fetchProducts(cb) {
        getProductsFromFile(cb)
    }
}