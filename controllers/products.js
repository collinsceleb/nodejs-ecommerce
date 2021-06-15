const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDirectory, "views", "add-product.html"));

  // Using Pug template engine
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  // console.log(req.body);
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};


exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDurectory, "views", "shop.html"));

  const products = Product.fetchProducts(products => {

    // Using Pug Template Engine
    res.render("shop", {
      products: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
  
};
