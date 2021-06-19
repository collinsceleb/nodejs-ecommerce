const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDirectory, "views", "add-product.html"));

  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  // console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, description, imageUrl, price);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDirectory, "views", "add-product.html"));
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/")
  }

  const productId = req.params.productId;
  Product.fetchProductById(productId, product => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  })
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedImageUrl = req.body.imageUrl;
  const updatedProducts = new Product(productId, updatedTitle, updatedDescription, updatedImageUrl, updatedPrice);
  updatedProducts.save();
  res.redirect("/admin/products");
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect("/admin/products");
}
exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDurectory, "views", "shop.html"));

  Product.fetchProducts((products) => {
    res.render("admin/products", {
      products: products,
      pageTitle: "AdminProducts",
      path: "/admin/products",
    });
  });
};

