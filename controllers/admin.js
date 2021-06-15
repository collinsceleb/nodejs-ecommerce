const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDirectory, "views", "add-product.html"));

  // Using Pug template engine
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  // console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, description, imageUrl, price);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDurectory, "views", "shop.html"));

  Product.fetchProducts((products) => {
    // Using Pug Template Engine
    res.render("admin/products", {
      products: products,
      pageTitle: "AdminProducts",
      path: "/admin/products",
    });
  });
};

