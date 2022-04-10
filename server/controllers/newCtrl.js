const News = require('../models/newsModel');

const newsCtrl = {
  getNews: async (req, res) => {
    try {
      const news = await News.find();
      res.json(news);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createNews: async (req, res) => {
    try {
      const { title, content, images } = req.body;

      const news = await News.findOne({ title });
      if (news) return res.status(404).json({ msg: 'This news already exist' });
      const newNews = new News({ title, content, images });
      await newNews.save();

      res.json({ msg: 'Create News Success' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteNews: async (req, res) => {
    try {
      await News.findByIdAndDelete(req.params.id);
      res.json({ msg: 'deleteNews success' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateNews: async (req, res) => {
    try {
      const { title, content, images } = req.body;

      await News.findOneAndUpdate({
        id: req.params.id,
        title,
        content,
        images,
      });
      res.json({ msg: 'Update success' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = newsCtrl;
