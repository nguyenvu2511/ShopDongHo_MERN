const Orders = require('../models/orderModel');
const Users = require('../models/userModel');
const Products = require('../models/productModel');

const orderCtrl = {
  getOrders: async (req, res) => {
    try {
      const orders = await Orders.find();
      res.json(orders);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select(
        'name email address'
      );
      if (!user)
        return res.status(500).json({ msg: 'Người dùng không tôn tại.' });

      const { cart, total } = req.body;
      const { _id, name, email, address } = user;

      const newOrder = new Orders({
        user_id: _id,
        name,
        email,
        cart,
        address,
        total,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });
      await newOrder.save();
      res.json({ msg: 'order success' });
      const setCart = await Users.findByIdAndUpdate(
        { _id: req.user.id },
        { cart: [] }
      );
      setCart.save();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate({ _id: id }, { sold: quantity + oldSold });
};
module.exports = orderCtrl;
