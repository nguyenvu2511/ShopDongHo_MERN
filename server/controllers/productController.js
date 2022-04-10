const Products = require('../models/productModel');

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await Products.find();
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        name,
        price,
        description,
        content,
        images,
        category,
        brand,
      } = req.body;
      if (!images) return res.status(400).json({ msg: 'No image upload' });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: 'This product already exists.' });

      const newProduct = new Products({
        product_id,
        name,
        price,
        description,
        content,
        images,
        category,
        brand,
      });

      await newProduct.save();
      res.json({ msg: 'Created a product' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Deleted a Product' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { name, price, description, content, images, category, brand } =
        req.body;
      if (!images) return res.status(400).json({ msg: 'No image upload' });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          price,
          description,
          content,
          images,
          category,
          brand,
        }
      );

      res.json({ msg: 'Updated a Product' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productController;
