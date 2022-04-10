const router = require('express').Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
router
  .route('/order')
  .get(auth, orderController.getOrders)
  .post(auth, orderController.createOrder);

router.route('/order/:id').put(auth, authAdmin, orderController.updateOrder);

module.exports = router;
