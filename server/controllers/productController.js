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
      if (!images) return res.status(400).json({ msg: 'Không có hình ảnh' });

      const product = await Products.findOne({ product_id });
      if (product) return res.status(400).json({ msg: 'Sản phẩm dã tồn tại.' });

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
      res.json({ msg: 'Thêm sản phẩm mới thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Xóa sản phẩm thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { name, price, description, content, images, category, brand } =
        req.body;
      if (!images) return res.status(400).json({ msg: 'Không có hình ảnh!' });

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

      res.json({ msg: 'Cập nhật sản phẩm thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productController;
