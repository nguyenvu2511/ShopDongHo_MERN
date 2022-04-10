const Brand = require('../models/brandModel');

const brandController = {
  getBrands: async (req, res) => {
    try {
      const brands = await Brand.find();
      res.json(brands);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createBrand: async (req, res) => {
    try {
      const { name, images } = req.body;

      const brand = await Brand.findOne({ name });
      if (brand)
        return res.status(404).json({ msg: 'Thương hiệu này đã tồn tại!' });
      const newBrand = new Brand({ name, images });
      await newBrand.save();

      res.json({ msg: 'Thêm thương hiệu thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBrand: async (req, res) => {
    try {
      await Brand.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Xóa thương hiệu thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBrand: async (req, res) => {
    try {
      const { name, images } = req.body;

      await Brand.findOneAndUpdate({ _id: req.params.id }, { name, images });
      res.json({ msg: 'Cập nhật thương hiệu thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = brandController;
