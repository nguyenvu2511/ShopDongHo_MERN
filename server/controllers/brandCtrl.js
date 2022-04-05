const Brand = require('../models/brandModel');

const brandCtrl = {
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
        return res.status(404).json({ msg: 'This brand already exist' });
      const newBrand = new Brand({ name, images });
      await newBrand.save();

      res.json({ msg: 'Create Brand Success' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBrand: async (req, res) => {
    try {
      await Brand.findByIdAndDelete(req.params.id);
      res.json({ msg: 'deleteBrand success' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBrand: async (req, res) => {
    try {
      const { name } = req.body;

      await Brand.findOneAndUpdate({ id: req.params.id, name, images });
      res.json({ msg: 'Update success' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = brandCtrl;
