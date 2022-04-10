const Category = require('../models/categoryModel');

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const category = await Category.findOne({ name });
      if (category)
        return res.status(404).json({ msg: 'Loại sản phẩm đã tồn tại !' });
      const newCategory = new Category({ name });
      await newCategory.save();

      res.json({ msg: 'Thêm loại sản phẩm thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Xóa loại sản phẩm thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;

      await Category.findOneAndUpdate({ id: req.params.id, name });
      res.json({ msg: 'Cập nhật loại sản phẩm thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryController;
