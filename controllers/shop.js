const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDurectory, "views", "shop.html"));

  Product.fetchProducts().then(([rows, fieldData]) => {
    res.render("shop/product-list", {
      products: rows,
      pageTitle: "Products",
      path: "/products",
    });
  }).catch(err => {
    console.log(err);
  })  
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.fetchProductById(productId).then(([product]) => {
    res.render("shop/product-detail", {
      product: product[0],
      path: "/products",
      pageTitle: product.title
    })
  }).catch(err => {
    console.log(err);
  });
};


exports.getIndex = (req, res, next) => {
  Product.fetchProducts().then(([rows, fieldData]) =>{

    res.render("shop/index", {
      products: rows,
      pageTitle: "Shop",
      path: "/",
    });
  }).then(err => {
    console.log(err);
  })
    
};


exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchProducts(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(p => p.id === product.id);
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts
      });
    });
  });
}

exports. postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.fetchProductById(productId, product => {
    Cart.addProduct(productId, product.price);
  })
  res.redirect("/cart");
}

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.fetchProductById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};


exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
