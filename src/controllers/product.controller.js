const db = require('../config/database');

exports.createProduct = async (req, res) => {
    const {productName, quantity, price} = req.body;
    const {rows} = await db.query(
        "INSERT INTO products (productName, quantity, price) VALUES ($1, $2, $3)",
        [productName, quantity, price]
    );
  res.status(201).send({
      message: "Produto adicionado com sucesso",
      body: {
          product: {productName, quantity, price}
      },
  });
};

exports.listAllProducts = async (req, res) => {
    const response = await db.query('SELECT * FROM products ORDER BY productName');
    res.status(200).send(response.rows);
};

exports.findProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM products WHERE productid = $1', [productId]);
    res.status(200).send(response.rows);
};

exports.updateProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    const {productName, quantity, price} = req.body;

    const response = await db.query(
        "UPDATE products SET productName = $1, quantity = $2, price = $3 WHERE productid = $4",
        [productName, quantity, price, productId]
    );
    res.status(200).send({message: "Product updated"});
};

exports.deleteProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    await db.query('DELETE FROM products WHERE productid = $1', [productId]);
    res.status(200).send({message: 'Product deleted', productId});
}

