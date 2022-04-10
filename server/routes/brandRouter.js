const router = require('express').Router();
const brandController = require('../controllers/brandController');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
router
  .route('/brand')
  .get(brandController.getBrands)
  .post(auth, authAdmin, brandController.createBrand);

router.route('/brand/:id').delete(auth, authAdmin, brandController.deleteBrand);

router.route('/brand/:id').put(auth, authAdmin, brandController.updateBrand);
module.exports = router;
