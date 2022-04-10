const router = require('express').Router();
const newsCtrl = require('../controllers/newCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router
  .route('/news')
  .get(newsCtrl.getNews)
  .post(auth, authAdmin, newsCtrl.createNews);

router.route('/news/:id').delete(auth, authAdmin, newsCtrl.deleteNews);

router.route('/news/:id').put(auth, authAdmin, newsCtrl.updateNews);
module.exports = router;
