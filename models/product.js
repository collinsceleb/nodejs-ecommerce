const Cart = require("./cart");

const db = require("../utils/database");

module.exports = class Product {
    constructor(id, title, description, imageUrl, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }
    save() {
        return db.execute("INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)", 
        [this.title, this.price, this.description, this.imageUrl]);
    }

    static deleteById(id) {
        
    }
    
    static fetchProducts(cb) {
        return db.execute("SELECT * FROM products");
    }

    static fetchProductById(id) {
        return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
    }
}