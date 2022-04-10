const router = require('express').Router();
const newController = require('../controllers/newController');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router
  .route('/news')
  .get(newController.getNews)
  .post(auth, authAdmin, newController.createNews);

router.route('/news/:id').delete(auth, authAdmin, newController.deleteNews);

router.route('/news/:id').put(auth, authAdmin, newController.updateNews);
module.exports = router;
